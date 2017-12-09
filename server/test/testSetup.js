'use strict';

const knex = require('../db');
const { testData } = require('./testData');

let testSetup = {};

testSetup.addUserTable = function() {
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
    item.id_user = usrID;
    linksArr.push(item);
  });
  // add org link seeds
  testData.testOrgLinks.map( item => {
    item.id_user = orgID;
    linksArr.push(item);
  })
  // insert array of link objects into links table
  return knex('links')
    .insert(linksArr)
};

testSetup.buildFullDB = function() {
  console.log('running buildFullDB');
  // focus user and org will have links to other tables for tests of foreign key linked data
  let focusUserID;
  let focusOrgID;
  return (testSetup.addUserTable())
  .then( () => {
    return (testData.seedUserTable())
  })
  .then( () => {
    // select individual and org for focus
    return (testSetup.setTestParams());
  })
  .then( results => {
    focusUserID = results.focus_user_id;
    focusOrgID = results.focus_org_id;
    return (testSetup.addLinksTable());
  })
  .then( () => {
    return (testSetup.seedLinksTable(focusUserID, focusOrgID));
  })
};

testSetup.tearDownDB = function() {
  console.log('running tearDownDB');
  return knex.schema.dropTableIfExists('links')
    .then( () => {
      return knex.schema.dropTableIfExists('users')
    });
};

testSetup.addTestParamsTable = function() {
  console.log('running addTestParamsTable');
  return knex.schema.createTable('test_params', function(table) {
    table.increments('id').primary();
    table.integer('focus_user_id');
    table.integer('focus_org_id');
  });
};

testSetup.setTestParams = function() {
  console.log('running setTestParams');
  let focusUserId;
  let focusOrgId;
  return knex('users')
    .select('id', 'user_type')
    .orderBy('user_type')
    .then( results => {
      // create arrays of users and orgs
      const userArr = [];
      const orgArr = [];
      results.map( item => item.user_type === 'individual' ? 
        userArr.push(item.id) : orgArr.push(item.id));
      // randomly select one user and one org for testing focus
      const usrIdx = Math.floor(Math.random()*userArr.length);
      const orgIdx = Math.floor(Math.random()*orgArr.length);
      focusUserId = userArr[usrIdx];
      focusOrgId = orgArr[orgIdx];
      // test_param table is not broken down and rebuilt
      // it should only ever have one row of data
      // clear old data and insert new
      return knex('test_params')
        .del()
        .then( () => {
          const tpObj = {}
          return knex('test_params')
            .returning(['focus_user_id', 'focus_org_id'])
            .insert({
              focus_user_id: focusUserId,
              focus_org_id: focusOrgId
            })
        })
    })
}

module.exports = { testSetup };