const { Client } = require('pg')

require('dotenv').config();

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const connection = async () => {
  try {
    await client.connect();
    console.log('PostgreSQL is connected..')
  }
  catch(error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = connection;