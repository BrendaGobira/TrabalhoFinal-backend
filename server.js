const app = require('./api/index');

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
