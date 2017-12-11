'use strict';

const knex = require('../db');

let testData = {};

testData.userSeeds = [
  {
    username: 'swimmer85',
    passwd: 'swimmer85spassword',
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
    passwd: 'darkospassword',
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
    passwd: 'packerfanspw',
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
    passwd: 'shelterprezpw',
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
    passwd: 'stmampassword',
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
    passwd: 'howspassword',
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
  passwd: 'attorneyspassword',
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
  passwd: 'dragonflyspassword',
  user_type: 'organization',
  location_city: 'wildwood',
  location_state: 'fl',
  location_country: 'USA',
  bio: 'your child care partner in central fl',
  first_name: '',
  last_name: '',
  organization: 'Deer Lake Child Care'
};

testData.orgOppSeeds = [
  {
    opportunity_type: 'goods',
    offer: false,
    title: 'kitchen staples needed',
    narrative: 'we have a perpetual need for kitchen staples for meals on wheels program',
    location_city: 'jacksonville',
    location_state: 'fl',
  },
  {
    opportunity_type: 'services',
    offer: false,
    title: 'kitchen help needed',
    narrative: 'food prep needed for meals on wheels - we can train, no experience needed',
    location_city: 'jacksonville',
    location_state: 'fl',
  },
  {
    opportunity_type: 'financial',
    offer: false,
    title: 'funding for storage facility',
    narrative: 'funding needed to build climate controlled storage facility - every little bit helps!',
    location_city: 'lake city',
    location_state: 'fl',
  }
]

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

testData.testOrgCauses = [
  {cause: 'homelessness'},
  {cause: 'teen-pregnancy'},
  {cause: 'malnutrition'}
]

testData.skillSeeds = [
  {skill: 'clerical'},
  {skill: 'first aid'},
  {skill: 'leadership'},
  {skill: 'cooking'},
  {skill: 'fund-raising'},
  {skill: 'handyman'}
]

testData.testUserSkills = [
  {skill: 'clerical'},
  {skill: 'cooking'}
]

testData.seedUsersTable = function() {
  return knex('users')
    .insert(testData.userSeeds);
};

testData.seedCausesTable = function() {
  return knex('causes')
    .insert(testData.causeSeeds);
}

testData.seedSkillsTable = function() {
  return knex('skills')
    .insert(testData.skillSeeds);
}

module.exports = { testData };