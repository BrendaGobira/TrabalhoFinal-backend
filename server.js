const app = require('./api/index');
const config = require("./config");

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
