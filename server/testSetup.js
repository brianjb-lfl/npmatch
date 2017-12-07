'use strict';

const knex = require('./db');

let testSetup = {};

testSetup.addUserTable = function() {
  return knex.schema.dropTableIfExists('users')
    .then( () => knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').primary();
      table.text('username').unique();
      table.text('password');
      table.text('user_type', 'individual');
      table.text('location_city');
      table.text('location_state');
      table.text('location_country', "USA");
      table.text('bio');
      table.text('first_name');
      table.text('last_name');
      table.text('organization');
    }));
};

module.exports = { testSetup };