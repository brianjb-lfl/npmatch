'use strict';

const knex = require('../db');

let testData = {};

testData.userSeeds = [
  {
    username: 'swimmer85',
    password: 'swimmer85spassword',
    user_type: 'individual',
    location_city: 'losangeles',
    location_state: 'ca',
    location_country: 'USA',
    bio: 'i like swimming',
    first_name: 'aaron',
    last_name: 'anderson',
    organization: ''
  },
  {
    username: 'darkoverlord',
    password: 'darkospassword',
    user_type: 'individual',
    location_city: 'fayetteville',
    location_state: 'ar',
    location_country: 'USA',
    bio: 'its not easy being a dark overlord in arkansas',
    first_name: 'barrett',
    last_name: 'brady',
    organization: ''
  },
  {
    username: 'theshelter',
    password: 'shelterprezpw',
    user_type: 'organization',
    location_city: 'atlanta',
    location_state: 'ga',
    location_country: 'USA',
    bio: 'we provide hot meals with an extra portion of hope',
    first_name: '',
    last_name: '',
    organization: 'The Shelter on 52nd'
  }
];

testData.testIndividual = {
  username: 'attorneyinks',
  password: 'attorneyspassword',
  user_type: 'individual',
  location_city: 'topeka',
  location_state: 'ks',
  location_country: 'USA',
  bio: 'solving your problems in my arena',
  first_name: 'grady',
  last_name: 'goodlove',
  organization: ''
};

testData.testOrganization = {
  username: 'dragonfly11',
  password: 'dragonflyspassword',
  user_type: 'organization',
  location_city: 'wildwood',
  location_state: 'fl',
  location_country: 'USA',
  bio: 'your child care partner in central fl',
  first_name: '',
  last_name: '',
  organization: 'Deer Lake Child Care'
};

testData.seedUserTable = function() {
  return knex('users')
    .insert(testData.userSeeds);
};

module.exports = { testData };