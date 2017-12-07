'use strict';

require('dotenv').load();

const { DATABASE_URL, TEST_DATABASE_URL } = require('./config');
let dbMode = process.env.DB_MODE;

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

module.exports = require('knex')(dbCfg);