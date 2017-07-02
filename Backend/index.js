const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const fs = require("fs");
const shortid = require("shortid");

function toObject(data) {
	var obj = {};
	data.forEach((v) => {
		obj[v.id] = v;
	});
	return obj;
}

function saveBase64(path, name, data) {
	var regex = /^data:image\/([a-zA-Z]+);base64,/;
	var matches = data.match(regex);
	var replaced = data.replace(regex, "");
	var fullPath = path + name + "." + matches[1];
	
	fs.writeFile(fullPath, replaced, "base64", err => {
		console.log(err);
	});
	
	return name + "." + matches[1];
}

var enableCors = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	next();
};

const pgConfig = {
	host: "localhost",
	port: 5432,
	database: "db_concatto",
	user: "user_concatto",
	password: "lia123"
};

const db = pgp(pgConfig);


//Router para viagens
const viagensRouter = express.Router();

viagensRouter.get("/", (req, res) => {
	db.any("SELECT id, porto_saida, porto_saida_id, porto_chegada, porto_chegada_id, data_chegada, data_saida, embarcacao, embarcacao_id FROM viagens_hierarquicas").then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});

viagensRouter.delete("/:id", (req, res) => {
	//Início da transação
	db.tx(t => {
		//Primeiramente, remover as capturas dos lances da viagem.
		return t.none("DELETE FROM captura WHERE captura.lance_id IN (SELECT lance.id FROM lance WHERE lance.viagem_id = ${id})", req.params).then(() => {
			//Em segundo lugar, remover os lances da viagem.
			return t.none("DELETE FROM lance WHERE lance.viagem_id = ${id}", req.params).then(() => {
				//Por fim, remover a própria viagem.
				return t.none("DELETE FROM viagem WHERE viagem.id = ${id}", req.params);
			});
		});
		//Fim da transação
	}).then(() => {
		res.status(200).end();
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

viagensRouter.post("/", (req, res) => {
	const tripData = [req.body.ship, req.body.sourcePort, req.body.destPort, req.body.tripStart, req.body.tripEnd];
	//START TRANSACTION
	db.tx(t => {
		//Iniciamos inserindo a viagem recebida.
		return t.any("INSERT INTO viagem (embarcacao_id, porto_saida_id, porto_chegada_id, data_saida, data_chegada) VALUES ($1, $2, $3, $4, $5) RETURNING id", tripData)
			.then(data => {
				//Assim que a viagem for inserida, precisamos inserir os lances, caso existam.
				if (!req.body.efforts) return;
				
				//Inserimos todos os lances, utilizando o id retornado pela inserção da viagem
				const efforts = req.body.efforts.map(effort => {
					effort.trip = data[0].id;
					effort.startTime = effort.date + " " + effort.startTime;
					effort.endTime = effort.date + " " + effort.endTime;
					
					return t.any("INSERT INTO lance (viagem_id, hora_inicio, hora_fim, comprimento_rede, altura_rede, tamanho_malha, profundidade, latitude_inicial, longitude_inicial) VALUES (${trip}, ${startTime}, ${endTime}, ${netLength}, ${netHeight}, ${gridSize}, ${depth}, ${lat}, ${lng}) RETURNING id", effort)
				});
				
				//Estamos prontos para disparar as inserções de lances.				
				return t.batch(efforts).then(effortData => {
					//Agora possuimos os ids dos lances inseridos. Cada um deles poderá causar a inserção de várias capturas.
					var allCaptures = [];
					
					//Verificaremos cada um dos lances, coletando suas capturas, caso existam. Sabemos que pelo menos um lance existe, senão não chegaríamos aqui
					req.body.efforts.forEach((effort, index) => {
						if (!effort.captures) return;
						
						//Cada captura do lance irá gerar uma inserção na tabela de capturas, que deve utilizar o id retornado pela inserção em lote
						effort.captures.forEach(capture => {
							capture.effort = effortData[index][0].id;
							
							allCaptures.push(t.any("INSERT INTO captura (lance_id, especie_id, peso) VALUES (${effort}, ${fish}, ${weight})", capture));
						});
					});
					
					//Caso haja pelo menos uma captura em todos os lances, disparar todas as inserções
					if (allCaptures.length > 0) {
						return t.batch(allCaptures);
					}
				}).catch(err => {
					console.log(err);
				});
			}).catch(err => {
				console.log(err);
			});
	}).then(data => {
		res.status(200).end();
	}).catch(err => {
		console.log(err);
		res.status(500).json(err);
	});
});

viagensRouter.get("/:id", (req, res) => {
	db.any("SELECT * FROM viagens_hierarquicas v WHERE v.id = $1", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});
//Fim do router


//Router para embarcações
const embarcacoesRouter = express.Router();

embarcacoesRouter.get("/", (req, res) => {
	db.any("SELECT * FROM embarcacao").then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});

embarcacoesRouter.delete("/:id", (req, res) => {
	db.none("DELETE FROM embarcacao WHERE id = ${id}", req.params).then(data => {
		res.status(200).end();
	}).catch(err => {
		if (err.code == 23503) {
			err.detailedMessage = "Ainda existem viagens que dependem desta embarcação.";
		}
		res.status(500).json(err);
	});
});

embarcacoesRouter.post("/", (req, res) => {
	db.any("INSERT INTO embarcacao (nome, tamanho) VALUES (${name}, ${size})", req.body).then(data => {
		res.status(200).end();
	}).catch(err => {
		res.status(500).json(err);
	});
});

embarcacoesRouter.get("/:id", (req, res) => {
	db.any("SELECT * FROM embarcacao WHERE id = $1", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});
//Fim do router


//Router para portos
const portosRouter = express.Router();

portosRouter.get("/", (req, res) => {
	db.any("SELECT * FROM porto").then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});

portosRouter.delete("/:id", (req, res) => {
	db.none("DELETE FROM porto WHERE id = ${id}", req.params).then(data => {
		res.status(200).end();
	}).catch(err => {
		if (err.code == 23503) {
			err.detailedMessage = "Ainda existem viagens que dependem deste porto.";
		}
		res.status(500).json(err);
	});
});

portosRouter.post("/", (req, res) => {
	const formData = req.body;
	formData.adm = formData.adm === "public" ? 1 : 0;
	
	db.any("INSERT INTO porto (nome, adm, ano_fundacao) VALUES (${name}, ${adm}, ${year})", formData).then(data => {
		res.status(200).end();
	}).catch(err => {
		res.status(500).json(err);
	});
});

portosRouter.get("/:id", (req, res) => {
	db.any("SELECT * FROM porto WHERE id = $1", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});
//Fim do router


//Router para espécies
const especiesRouter = express.Router();

especiesRouter.get("/", (req, res) => {
	db.any("SELECT e.*, CASE WHEN COUNT(f.id) = 0 THEN '[]' ELSE json_agg(f.*) END AS fotos FROM especie e LEFT JOIN fotografia f on f.especie_id = e.id GROUP BY e.id").then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});

especiesRouter.delete("/:id", (req, res) => {
	db.tx(t => {
		return t.any("DELETE FROM fotografia WHERE especie_id = ${id} RETURNING caminho", req.params).then(data => {
			return t.batch([
				data,
				t.none("DELETE FROM especie WHERE id = ${id}", req.params)				
			]);
		});
	}).then(data => {
		data[0].forEach(image => {
			fs.unlink("C:/Users/Fernando/MapaBordo/borealis/public" + image.caminho, err => {
				console.log(err);
			});
		});
		
		res.status(200).json(data);
	}).catch(err => {
		if (err.code == 23503) {
			err.detailedMessage = "Ainda existem viagens que contém esta espécie.";
		}
		res.status(500).json(err);
	});
});

especiesRouter.post("/", (req, res) => {
	db.tx(t => {
		//BEGIN TRANSACTION
		
		return t.many("INSERT INTO especie (nome, profundidade_min, profundidade_max) VALUES (${name}, ${minDepth}, ${maxDepth}) RETURNING id", req.body)
			.then(data => {
				//Espécie inserida, agora precisamos do ID
				const id = data[0].id;
				
				//Caso haja alguma foto
				if (req.body.photos) {
					//Gravar os arquivos no disco e mapear para INSERTs
					const queries = req.body.photos.map(item => {
						const name = shortid.generate();
						const fullName = saveBase64("C:/Users/Fernando/MapaBordo/borealis/public/assets/", name, item.image); //TODO relativo
						
						return t.none("INSERT INTO fotografia (caminho, especie_id) VALUES ($1, $2)", ["/assets/" + fullName, id]);
					});
					
					//Realizar todos os INSERTs das fotos em lote
					return t.batch(queries);
				}
			}).catch(err => {
				console.log(err);
				res.status(500).json(err);
			});
			
		//END TRANSACTION
	}).then(data => {
		res.status(200).end();
	}).catch(err => {
		res.status(500).json(err);
	});
});

especiesRouter.get("/:id", (req, res) => {
	db.any("SELECT e.*, CASE WHEN COUNT(f.id) = 0 THEN '[]' ELSE json_agg(f.*) END AS fotos FROM especie e LEFT JOIN fotografia f on f.especie_id = e.id WHERE e.id = $1 GROUP BY e.id", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		res.status(500).json(err);
	});
});
//Fim do router


//Router para relatórios
const relatorioRouter = express.Router();

relatorioRouter.get("/geral", (req, res) => {
	db.any("SELECT * FROM relatorio_geral").then(data => {
		res.status(200).json(data);
	}).catch(err => {
		res.status(500).json(err);
	});
});

relatorioRouter.get("/especies", (req, res) => {
	db.any("SELECT * FROM relatorio_especies").then(data => {
		res.status(200).json(data);
	}).catch(err => {
		res.status(500).json(err);
	});
});

relatorioRouter.get("/embarcacoes", (req, res) => {
	db.any("SELECT * FROM relatorio_embarcacoes").then(data => {
		res.status(200).json(data);
	}).catch(err => {
		res.status(500).json(err);
	});
});

//Fim do router


var app = express();
app.use(enableCors);
app.use(bodyParser.json({limit: "20mb"}));
app.use("/viagem", viagensRouter);
app.use("/embarcacao", embarcacoesRouter);
app.use("/porto", portosRouter);
app.use("/especie", especiesRouter);
app.use("/relatorio", relatorioRouter);

var server = http.createServer(app);
server.listen("4000");