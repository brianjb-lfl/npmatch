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

module.exports = { epHelp };