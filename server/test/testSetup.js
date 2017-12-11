'use strict';

const knex = require('../db');
const { testData } = require('./testData');

let testSetup = {};

testSetup.addUsersTable = function() {
  console.log('running add user table');
  return knex.schema.createTable('users', function(table) {
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
  });
};

testSetup.addLinksTable = function() {
  console.log('running addLinksTable');
  return knex.schema.createTable('links', function(table) {
    table.increments('id').primary();
    table.integer('id_user');
    table.foreign('id_user').references('users.id');
    table.text('link_type');
    table.text('link_url');
    table.timestamp('timestamp_created').defaultTo(knex.fn.now());
  });
};

testSetup.seedLinksTable = function( usrID, orgID ) {
  console.log('running seedLinksTable');
  // create array for link objects that will be imported
  let linksArr = [];
  // add individual link seeds
  testData.testUserLinks.map( item => {
    linksArr.push({
      link_type: item.link_type,
      link_url: item.link_url,
      id_user: usrID
    });
  });
  // add org link seeds
  testData.testOrgLinks.map( item => {
    linksArr.push({
      link_type: item.link_type,
      link_url: item.link_url,
      id_user: orgID
    });
  })
  // insert array of link objects into links table
  return knex('links')
    .insert(linksArr)
};

testSetup.addOppsTable = function() {
  console.log('running addOppsTable');
  return knex.schema.createTable('opportunities', function(table) {
    table.increments('id').primary();
    table.timestamp('timestamp_created').defaultTo(knex.fn.now());
    table.text('opportunity_type');
    table.boolean('offer').defaultTo(false);
    table.text('title')
  })
}

// CREATE TABLE opportunities (
//   id serial primary key,
//   timestamp_created timestamp default current_timestamp,
//   -- type: goods, services, financial
//   opportunity_type text default 'services',
//   -- offer: true if offer to provide, false if a need
//   offer boolean default 'false',
//   title text not null,
//   -- do we want description and identification of need combined?
//   narrative text not null,
//   timestamp_start timestamp,
//   timestamp_end timestamp,
//   location_city text,
//   location_state text,
//   --default "USA"
//   location_country text,
//   -- the user below is the "owner" of this opportunity
//   id_user integer references users on delete cascade,
//   -- link = url for the event (do not populate [on front] if the same as the user's url)
//   link text default null
// );

testSetup.addCausesTable = function() {
  console.log('running addCausesTable');
  return knex.schema.createTable('causes', function(table) {
    table.increments('id').primary();
    table.text('cause');
  });
};

testSetup.addUsersCausesTable = function() {
  console.log('running addUsersCausesTable');
  return knex.schema.createTable('users_causes', function(table) {
    table.increments('id').primary();
    table.integer('id_user');
    table.foreign('id_user').references('users.id');
    table.integer('id_cause');
    table.foreign('id_cause').references('causes.id');
    table.timestamp('timestamp_created').defaultTo(knex.fn.now());
  });
};

testSetup.seedUsersCausesTable = function(usrID) {
  console.log('running seedUsersCauses');
  testData.testUserCauses.map( item => {
    return knex('causes')
      .select('id')
      .where({cause: item.cause})
      .then( result => {
        return knex('users_causes')
          .insert({
            id_user: usrID,
            id_cause: result[0].id
          })
      })
  });
};

testSetup.addSkillsTable = function() {
  console.log('running addSkillsTable');
  return knex.schema.createTable('skills', function(table) {
    table.increments('id').primary();
    table.text('skill');
  });
};

testSetup.addUsersSkillsTable = function() {
  console.log('running addUsersSkillsTable');
  return knex.schema.createTable('users_skills', function(table) {
    table.increments('id').primary();
    table.integer('id_user');
    table.foreign('id_user').references('users.id');
    table.integer('id_skill');
    table.foreign('id_skill').references('skills.id');
    table.timestamp('timestamp_created').defaultTo(knex.fn.now());
  });
};

testSetup.seedUsersSkillsTable = function(usrID) {
  console.log('running seedUsersSkills');
  return testData.testUserSkills.map( item => {
    return knex('skills')
      .select('id')
      .where({skill: item.skill})
      .then( result => {
        return knex('users_skills')
          .insert({
            id_user: usrID,
            id_skill: result[0].id
          })
      })
  });
};

// ***** BUILD DB *****
testSetup.buildFullDB = function() {
  console.log('running buildFullDB');
  // focus user and org will have links to other tables for tests of foreign key linked data
  let focusUserID;
  let focusOrgID;
  return (testSetup.addUsersTable())
    .then( () => {
      return (testData.seedUsersTable());
    })
    .then( () => {
      // select individual and org for focus
      return (testSetup.setTestParams());
    })
    .then( results => {
      focusUserID = results[0].focus_user_id;
      focusOrgID = results[0].focus_org_id;
      return (testSetup.addLinksTable());
    })
    .then( () => {
      return (testSetup.seedLinksTable(focusUserID, focusOrgID));
    })
    .then( () => {
      return (testSetup.addCausesTable());
    })
    .then( () => {
      return (testData.seedCausesTable());
    })
    .then( () => {
      return (testSetup.addUsersCausesTable());
    })
    .then( () => {
      return (testSetup.seedUsersCausesTable(focusUserID));
    })
    .then( () => {
      return (testSetup.addSkillsTable());
    })
    .then( () => {
      return (testData.seedSkillsTable());
    })
    .then( () => {
      return (testSetup.addUsersSkillsTable());
    })
    .then( () => {
      return (testSetup.seedUsersSkillsTable(focusUserID));
    })

};

// ***** TEAR DOWN DB *****
testSetup.tearDownDB = function() {
  console.log('running tearDownDB');
  return knex.schema.dropTableIfExists('links')
    .then( () => {
      return knex.schema.dropTableIfExists('users_causes')
    })
    .then( () => {
      return knex.schema.dropTableIfExists('users_skills')
    })
    .then( () => {
      return knex.schema.dropTableIfExists('causes');
    })
    .then( () => {
      return knex.schema.dropTableIfExists('skills');
    })
    .then( () => {
      return knex.schema.dropTableIfExists('users')
    });
};

testSetup.addTestParamsTable = function() {
  console.log('running addTestParamsTable');
  return knex.schema.createTable('test_params', function(table) {
    table.increments('id').primary();
    table.integer('focus_user_id');
    table.text('focus_user_username');
    table.integer('focus_org_id');
    table.text('focus_org_username');
  });
};

testSetup.setTestParams = function() {
  console.log('running setTestParams');
  const userArr = [];
  const orgArr = [];
  return knex('users')
    .select('id', 'user_type', 'username')
    .orderBy('user_type')
    .then( results => {
      // create arrays of users and orgs
      results.map( item => item.user_type === 'individual' ? 
        userArr.push({id: item.id, username: item.username}) : 
        orgArr.push({id: item.id, username: item.username}));
      // randomly select one user and one org for testing focus
      const usrIdx = Math.floor(Math.random()*userArr.length);
      const orgIdx = Math.floor(Math.random()*orgArr.length);
      // test_param table is not broken down and rebuilt
      // it should only ever have one row of data
      // clear old data and insert new
      return knex('test_params')
        .del()
        .then( () => {
          const tpObj = {}
          return knex('test_params')
            .returning(['focus_user_id', 'focus_user_username', 
              'focus_org_id', 'focus_org_username'])
            .insert({
              focus_user_id: userArr[usrIdx].id,
              focus_user_username: userArr[usrIdx].username,
              focus_org_id: orgArr[orgIdx].id,
              focus_org_username: orgArr[orgIdx].username,
            })
        })
    })
}

module.exports = { testSetup };