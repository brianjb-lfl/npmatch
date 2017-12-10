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
    username: 'packerfan75',
    password: 'packerfanspw',
    user_type: 'individual',
    location_city: 'two rivers',
    location_state: 'wi',
    location_country: 'USA',
    bio: 'parent of rescue shitzus, fan of pack',
    first_name: 'dodie',
    last_name: 'davis',
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
  },
  {
    username: 'stmarysareamission',
    password: 'stmampassword',
    user_type: 'organization',
    location_city: 'high point',
    location_state: 'nc',
    location_country: 'USA',
    bio: 'the blessed, paying it forward',
    first_name: '',
    last_name: '',
    organization: 'St Marys Area Mission'
  },
  {
    username: 'hopeonwheels',
    password: 'howspassword',
    user_type: 'organization',
    location_city: 'miami',
    location_state: 'fl',
    location_country: 'USA',
    bio: 'meeting the needs wherever they are',
    first_name: '',
    last_name: '',
    organization: 'Hope on Wheels LLC'
  }
];

testData.testIndividual = {
  username: 'attorneyinks',
  password: 'attorneyspassword',
  user_type: 'individual',
  location_city: 'topeka',
  location_state: 'ks',
  location_country: 'USA',
  bio: 'i speak legal',
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

testData.testUserLinks = [
  {
    link_type: 'homepage',
    link_url: 'http://www.abc.com'
  },
  {
    link_type: 'resume',
    link_url: 'http://www.ezresumes.com/abc'
  }
]

testData.testOrgLinks = [
  {
    link_type: 'homepage',
    link_url: 'http://www.home.com'
  },
  {
    link_type: 'news',
    link_url: 'http://www.thetimes.com/abc'
  }
]

testData.causeSeeds = [
  {cause: 'environment'},
  {cause: 'homelessness'},
  {cause: 'teen-pregnancy'},
  {cause: 'malnutrition'},
  {cause: 'pediatric-aids'},
  {cause: 'adult-literacy'}
]

testData.testUserCauses = [
  {cause: 'homelessness'},
  {cause: 'pediatric-aids'}
]

testData.seedUsersTable = function() {
  return knex('users')
    .insert(testData.userSeeds);
};

testData.seedCausesTable = function() {
  return knex('causes')
    .insert(testData.causeSeeds);
}

module.exports = { testData };