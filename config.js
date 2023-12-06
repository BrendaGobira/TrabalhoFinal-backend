const dotenv = require('dotenv');

dotenv.config();

const {
  PORT,
  PG_CONNECTION_STRING
} = process.env;

module.exports = {
  port: PORT,
  urlConnection: PG_CONNECTION_STRING
} 