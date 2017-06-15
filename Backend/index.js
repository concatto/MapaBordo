const http = require("http");
const express = require("express");
const pgp = require("pg-promise")();

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

var app = express();
app.use("/viagens", viagensRouter);

var server = http.createServer(app);
server.listen("4000");