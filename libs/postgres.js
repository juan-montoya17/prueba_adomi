const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'juan',
    password: '1234',
    database: 'prueba_adomi'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
