'use strict';

let epHelp = {};

epHelp.buildUser = function (userId) {

  let usrObj = {};
  const knex = require('../db');
  
  // get user base info
  return knex('users')
    .select()
    .where({id: userId})
    .then( results => {
      usrObj = (results[0]);
      delete usrObj['password'];
      // get user links
      return knex('links')
        .select('id', 'link_type as linkType', 'link_url as linkUrl')
        .where({id_user: usrObj.id});
    })

    .then( results => {
      usrObj.links = results;
      // get user causes
      return knex('users_causes')
        .join('causes', 'users_causes.id_cause', '=', 'causes.id')
        .select('causes.id', 'causes.cause')
        .where({id_user: usrObj.id});
    })

    .then( results => {
      usrObj.causes = results;
      // get user skills
      return knex('users_skills')
        .join('skills', 'users_skills.id_skill', '=', 'skills.id')
        .select('skills.id', 'skills.skill')
        .where({id_user: usrObj.id});
    })

    .then( results => {
      usrObj.skills = results;
      return usrObj;
    })

    .catch( err => {
      return {err: 500, message: 'Internal server error'};
    });
};

epHelp.buildOppBase = function(inOppObj) {

  // camelCase to snake_case conversion
  let retBaseObj = Object.assign( {}, inOppObj, {
    opportunity_type: inOppObj.opportunityType ? inOppObj.opportunityType : null,
    id_user: inOppObj.userId,
    location_city: inOppObj.locationCity ? inOppObj.locationCity : null,
    location_state: inOppObj.locationState ? inOppObj.locationState : null,
    location_country: inOppObj.locationCountry ? inOppObj.locationCountry : null,
    timestamp_start: inOppObj.timestampStart ? inOppObj.timestampStart : null,
    timestamp_end: inOppObj.timestampEnd ? inOppObj.timestampEnd : null,
  });

  delete retBaseObj.opportunityType;
  delete retBaseObj.userId;
  delete retBaseObj.locationCity;
  delete retBaseObj.locationState;
  delete retBaseObj.locationCountry;
  delete retBaseObj.timestampStart;
  delete retBaseObj.timestampEnd;
  delete retBaseObj.causes;

  return retBaseObj;
};

epHelp.buildOppCausesArr = function(oppId, inCausesArr) {

  let retArr = [];
  const knex = require('../db');
  
  return knex('causes')
    .select('id', 'cause')

    .then( allCauses => {
      inCausesArr.forEach( oppCause => {
        let tempCItem = allCauses.filter( item => item.cause === oppCause )[0];
        retArr.push(
          Object.assign( {}, {
            id_opp: oppId,
            id_cause: tempCItem.id
          })
        );
      });
      return retArr;
    })

    .catch( err => {
      return {err: 500, message: 'Internal server error'};
    });
};

module.exports = { epHelp };