//servidor.js

const express = require("express");
const servidor = express();
const hostname = "127.0.0.1";
const port = 4010;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
servidor.use(express.static("./"));
//servidor.use(express.json());

const { json } = require("express/lib/response");

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));
//servidor.use(express.static("Front/"));

servidor.get("/", function (res, req, next) {
  res.render("index");
});

var externalDist1 = 0;
var externalDist2 = 0;
var externalDist3 = 0;

servidor.post("/getdistances", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req);
  console.log(req.body);
  externalDist1 = req.body.dist1;
  externalDist2 = req.body.dist2;
  externalDist3 = req.body.dist3;
  texto = req.body;
  console.log(texto);
  console.log("Recebi um dado");
  res.send(texto);
});

servidor.get("/getdistances", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  dados = {
    dist1: externalDist1,
    dist2: externalDist2,
    dist3: externalDist3,
  };
  jsonD = JSON.stringify(dados);
  res.send(jsonD);
});

servidor.listen(port, hostname, () => {
  console.log(`Page server running at http://${hostname}:${port}/`);
});
