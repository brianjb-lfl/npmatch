'use strict';

//require('dotenv').load();
// const path = require('path');
// const dotEnvPath = path.resolve('../.env');
// require('dotenv').config({path: dotEnvPath});

const { PORT, CLIENT_ORIGIN, DATABASE_URL, TEST_DATABASE_URL } = require('./config');
let dbMode = process.env.DB_MODE;
console.log('db.js');
console.log(dbMode);
console.log(DATABASE_URL);
console.log(TEST_DATABASE_URL);


const dbConfigs = {
  dev: {
    client: 'pg',
    connection: DATABASE_URL,
    pool: { min: 0, max: 3 },
    debug: false
  },

  test: {
    client: 'pg',
    connection: TEST_DATABASE_URL,
    pool: { min: 0, max: 3 },
    debug: false
  }
};

const dbCfg = dbConfigs[dbMode];
console.log(dbCfg);

module.exports = require('knex')(dbCfg);