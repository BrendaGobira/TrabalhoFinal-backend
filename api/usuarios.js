const express = require('express');
const usuariosRouter = express.Router();
const client = require('./db');

usuariosRouter.get("/usuarios", (req, res) => {
  try {
    client.query("SELECT * FROM Usuarios", (err, result) => {
      if (err) {
        return console.error("Erro ao executar a qry de SELECT", err);
      }
      res.send(result.rows);
    });
  } catch (error) {
    console.log(error);
  }
});

usuariosRouter.get("/usuarios/:id", (req, res) => {
  try {
    client.query(
      "SELECT * FROM Usuarios WHERE id = $1",
      [req.params.id],
      (err, result) => {
        if (err) {
          return console.error("Erro ao executar a qry de SELECT id", err);
        }
        res.send(result.rows);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

usuariosRouter.delete("/usuarios/:id", (req, res) => {
  try {
    const id = req.params.id;
    client.query(
      "DELETE FROM Usuarios WHERE id = $1",
      [id],
      (err, result) => {
        if (err) {
          return console.error("Erro ao executar a qry de DELETE", err);
        } else {
          if (result.rowCount == 0) {
            res.status(400).json({ info: "Registro não encontrado." });
          } else {
            res.status(200).json({ info: `Registro excluído. Código: ${id}` });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

usuariosRouter.post("/usuarios", (req, res) => {
  try {
    const { nome, email } = req.body;
    client.query(
      "INSERT INTO Usuarios (nome, email) VALUES ($1, $2) RETURNING * ",
      [nome, email],
      (err, result) => {
        if (err) {
          return console.error("Erro ao executar a qry de INSERT", err);
        }
        const { id } = result.rows[0];
        res.setHeader("id", `${id}`);
        res.status(201).json(result.rows[0]);
      }
    );
  } catch (erro) {
    console.error(erro);
  }
});

usuariosRouter.put("/usuarios/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { nome, email } = req.body;
    client.query(
      "UPDATE Usuarios SET nome=$1, email=$2, WHERE id =$3 ",
      [nome, email, id],
      (err, result) => {
        if (err) {
          return console.error("Erro ao executar a qry de UPDATE", err);
        } else {
          res.setHeader("id", id);
          res.status(202).json({ id: id });
        }
      }
    );
  } catch (erro) {
    console.error(erro);
  }
});


module.exports = usuariosRouter;
