'use strict';

require('dotenv').load();

const DATABASE_URL = process.env.DATABASE_URL;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;
let DB_MODE = process.env.DB_MODE;

function setDbMode(mode='dev') {
  process.env.DB_MODE = mode;
}

module.exports = { DATABASE_URL, TEST_DATABASE_URL, setDbMode };

