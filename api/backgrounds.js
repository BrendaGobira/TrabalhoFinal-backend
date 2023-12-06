const express = require('express');
const backgroundsRouter = express.Router();
const client = require('./db');

backgroundsRouter.get("/backgrounds", (req, res) => {
  try {
    client.query("SELECT * FROM backgrounds", (err, result) => {
      if (err) {
        return console.error("Erro ao executar a qry de SELECT", err);
      }
      res.send(result.rows);
    });
  } catch (error) {
    console.log(error);
  }
});

backgroundsRouter.get("/backgrounds/:id", (req, res) => {
  try {
    client.query(
      "SELECT * FROM backgrounds WHERE user_id = $1",
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

backgroundsRouter.delete("/backgrounds/:id", (req, res) => {
  try {
    const id = req.params.id;
    client.query(
      "DELETE FROM backgrounds WHERE id = $1",
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

backgroundsRouter.post("/backgrounds", (req, res) => {
  try {
    const { background, user_id } = req.body;
    client.query(
      "INSERT INTO backgrounds (background, user_id) VALUES ($1, $2) RETURNING * ",
      [background, user_id],
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

backgroundsRouter.put("/backgrounds/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { background } = req.body;
    client.query(
      "UPDATE backgrounds SET background = $1 WHERE id = $2 ",
      [background, id],
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


module.exports = backgroundsRouter;
