'use strict';

process.stdout.write('\x1Bc');

let work = {};

work.getUsers = function() {
  const knex = require('./db');
  return knex
    .select('username', 'location_city', 'location_state', 
      'first_name', 'last_name', 'user_type', 'organization')
    .from ('users')
    .orderBy('username')
    .debug(false)
    .then( res => {
      knex.destroy();
      console.log('database connection closed');
      return Promise.resolve(res);
    });
};

work.addIndivUser = function(user) {
  const knex = require('./db');
  return knex('users')
    .insert({
      username: user.username,
      password: user.password, 
      first_name: user.first_name,
      last_name: user.last_name,
      location_city: user.location_city,
      location_state: user.location_state,
      organization: user.organization,
    })
    .then ( res => {
      console.log('--- post res ---');
      console.log(res);
      return knex.select()
        .from('users')
        .where('username', '=', user.username);
    })
    .then( res => {
      console.log('--- select res ---');
      console.log(res);
      return Promise.resolve(res);
    });
};

// work.updateUser = function() {
//   knex('users')
//     .where('username', '=', 'sevencounties')
//     .update({
//       location_city: 'Mt Washington',
//     })
//     .then( results => {
//       console.log(results);
//       work.closeDbConn();
//     });
// };  

// work.deleteUser = function() {
//   knex('users')
//     .where('username', '=', 'sevencounties')
//     .del()
//     .then( results => {
//       console.log(results);
//       work.closeDbConn();
//     });
// };

// function openDbConn() {
//   const knex = require('knex')(dbCfg);
//   console.log('database connection open');
// }

// function closeDbConn() {
//   knex.destroy()
//     .then( () => {
//       console.log('database connection closed');
//     });
// }

//work.getUsers();

module.exports = { work };