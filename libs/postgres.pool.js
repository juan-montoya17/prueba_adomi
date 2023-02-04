const { Pool } = require('pg');

const { config } = require('./../config/config');

const USER = encodeURI(config.dbUser);
const PASSWORD = encodeURI(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
