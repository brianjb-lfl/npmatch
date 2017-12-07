'use strict';

const knex = require('./db');

let testData = {};

testData.userSeeds = [
  {
    username: 'swimmer85',
    password: 'mypassword',
    location_city: 'losangeles',
    location_state: 'ca',
    first_name: 'aaron',
    last_name: 'anderson'
  },
  {
    username: 'darkoverlord',
    password: 'mypassword',
    location_city: 'fayetteville',
    location_state: 'ar',
    first_name: 'barrett',
    last_name: 'brady'
  }
];

testData.testUser = {
  username: 'cheElHombre',
  password: 'mypassword',
  location_city: 'miami',
  location_state: 'fl',
  first_name: 'carlos',
  last_name: 'caracas'
};

testData.seedUserTable = function() {
  return knex('users')
    .insert(testData.userSeeds);
};

module.exports = { testData };