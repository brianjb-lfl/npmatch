'use strict';

const knex = require('../db');

let testSetup = {};

testSetup.addUserTable = function() {
  return knex.schema.dropTableIfExists('users')
    .then( () => knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.text('username').unique();
      table.text('password');
      table.timestamp('timestamp_created').defaultTo(knex.fn.now());
      table.text('user_type').defaultTo('individual');
      table.text('location_city');
      table.text('location_state');
      table.text('location_country').defaultTo('USA');
      table.text('bio');
      table.text('first_name');
      table.text('last_name');
      table.text('organization');
    }));
};

testSetup.addLinksTable = function() {
  return knex.schema.dropTableIfExists('links')
    .then( () => knex.schema.createTable('links', function(table) {
      table.increments('id').primary();
      table.integer('id_user');
      table.foreign('id_user').references('users.id');
    }));
};

module.exports = { testSetup };