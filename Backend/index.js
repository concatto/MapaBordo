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

especiesRouter.post("/", (req, res) => {
	db.tx(t => {
		//BEGIN TRANSACTION
		
		return t.many("INSERT INTO especie (nome, profundidade_min, profundidade_max) VALUES (${name}, ${minDepth}, ${maxDepth}) RETURNING id", req.body)
			.then(data => {
				const id = data[0].id;
				console.log(data);
				console.log("Outside " + id);
				
				if (req.body.photos) {
					const queries = req.body.photos.map(item => {
						const name = shortid.generate();
						const fullName = saveBase64("C:/Users/Fernando/MapaBordo/borealis/public/assets/", name, item.image); //TODO relativo
						
						console.log("Inside " + id);
						return t.none("INSERT INTO fotografia (caminho, especie_id) VALUES ($1, $2)", ["/assets/" + fullName, id]);
					});
					
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