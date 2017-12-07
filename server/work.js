'use strict';

process.stdout.write('\x1Bc');

let work = {};

work.getUsers = function() {
  const knex = require('./db');
  return knex
    .select('username', 'location_city', 'location_state')
    .from ('users')
    .orderBy('username')
    .debug(false)
    .then(results => {
      knex.destroy();
      console.log('database connection closed');
      return Promise.resolve(results);
    });
};

// work.addUser = function() {
//   const knex = require('./db');
//   return knex('users')
//     .insert({
//       username: 'sevencounties', 
//       user_type: 'organization',
//       location_city: 'Louisville',
//       location_state: 'KY',
//       organization: 'Seven Counties Shelter',
//     })
//     .then ( res => {
//       console.log('--- post res ---');
//       console.log(res);
//       return knex.select()
//         .from('users');
//     })
//     .then( res => {
//       console.log('--- select res ---');
//       console.log(res);
//       closeDbConn();
//     });
// };

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