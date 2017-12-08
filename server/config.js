'use strict';

require('dotenv').load();

const DATABASE_URL = process.env.DATABASE_URL;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

function setDbMode(mode='dev') {
  console.log('setting env mode ', process.env.DB_MODE);
  process.env.DB_MODE = mode;
  console.log('done setting mode ', process.env.DB_MODE);
}

module.exports = { DATABASE_URL, TEST_DATABASE_URL, 
  PORT, CLIENT_ORIGIN, setDbMode };

