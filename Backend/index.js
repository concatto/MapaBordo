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

const viagensRouter = express.Router();

viagensRouter.get("/", (req, res) => {
	db.any("SELECT * FROM viagem").then(data => {
		res.status(200).json(data);
	}).catch(err => {
		res.status(500).json(err);
	});
});

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

var app = express();
app.use(enableCors);
app.use("/viagem", viagensRouter);
app.use("/embarcacao", embarcacoesRouter);

var server = http.createServer(app);
server.listen("4000");