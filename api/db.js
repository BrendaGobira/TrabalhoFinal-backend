const { Client } = require('pg');
const config = require("./config");

const conString = config.urlConnection;
const client = new Client(conString);
client.connect(function (err) {
  if (err) {
    return console.error('Não foi possível conectar ao banco.', err);
  }
  client.query('SELECT NOW()', (err, result) => {
    if (err) {
      return console.error('Erro ao executar a query.', err);
    }
    console.log(result.rows[0]);
  });
});

module.exports = client;
