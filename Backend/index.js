const http = require("http");
const express = require("express");
const pgp = require("pg-promise")();

function toObject(data) {
	var obj = {};
	data.forEach((v) => {
		obj[v.id] = v;
	});
	return obj;
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

especiesRouter.get("/:id", (req, res) => {
	db.any("SELECT e.*, CASE WHEN COUNT(f.id) = 0 THEN '[]' ELSE json_agg(f.*) END AS fotos FROM especie e LEFT JOIN fotografia f on f.especie_id = e.id WHERE e.id = $1 GROUP BY e.id", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		console.log(e);
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

relatorioRouter.get("/:id", (req, res) => {
	db.any("SELECT e.*, CASE WHEN COUNT(f.id) = 0 THEN '[]' ELSE json_agg(f.*) END AS fotos FROM especie e LEFT JOIN fotografia f on f.especie_id = e.id WHERE e.id = $1 GROUP BY e.id", req.params.id).then(data => {
		res.status(200).json(toObject(data));
	}).catch(err => {
		console.log(e);
		res.status(500).json(err);
	});
});
//Fim do router


var app = express();
app.use(enableCors);
app.use("/viagem", viagensRouter);
app.use("/embarcacao", embarcacoesRouter);
app.use("/porto", portosRouter);
app.use("/especie", especiesRouter);
app.use("/relatorio", relatorioRouter);

var server = http.createServer(app);
server.listen("4000");