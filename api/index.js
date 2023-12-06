const express = require("express");
const cors = require("cors");
const usuariosRouter = require("../usuarios");
const backgroundsRouter = require("../backgrounds");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Ok – Servidor disponível.");
});

app.use(usuariosRouter);
app.use(backgroundsRouter);

module.exports = app;
