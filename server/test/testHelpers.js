'use strict';

const knex = require('../db');
const { testData } = require('./testData');
const { testSetup } = require('./testSetup');

let testF = {};

testF.getFocusUser = function() {
  console.log('running getFocusUser');
  let usrObj = {};
  return knex('test_params')
    .select('focus_user_id', 'focus_user_username')
    .then( results => {
      usrObj = testData.userSeeds.filter( item => item.username === results[0].focus_user_username)[0];
      usrObj = Object.assign( {}, usrObj, ...results, {
        links: [...testData.testUserLinks],
        causes: [...testData.testUserCauses],
        skills: [...testData.testUserSkills]
      });
      return(usrObj);
    })
};

module.exports = { testF };