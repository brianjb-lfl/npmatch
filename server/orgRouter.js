'use strict';

const express = require('express');
const orgRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

process.stdout.write('\x1Bc');

// comm test
orgRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// GET api/users/list
orgRouter.get('/list', (req, res) => {
  const knex = require('./db');
  return knex
    .select('username', 'location_city', 'location_state', 'user_type', 'organization')
    .from ('users')
    .where({user_type: 'organization'})
    .orderBy('username')
    .debug(false)
    .then( results => {
      res.json(results);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });    
});

// GET api/users/:id
// orgRouter.get('/:id', (req, res) => {
//   let usrObj = {}
//   const knex = require('./db');
//   // get user base info
//   return knex('users')
//     .select()
//     .where({id: req.params.id})
//     .then( results => {
//       usrObj = ({...results[0]});
//       // get user links
//       return knex('links')
//         .select('id', 'link_type', 'link_url')
//         .where({id_user: usrObj.id})
//     })
//     .then( results => {
//       usrObj.links = results;
//       // get user causes
//       return knex('users_causes')
//         .join('causes', 'users_causes.id_cause', '=', 'causes.id')
//         .select('causes.id', 'causes.cause')
//         .where({id_user: usrObj.id})
//     })
//     .then( results => {
//       usrObj.causes = results;
//       // get user skills
//       return knex('users_skills')
//         .join('skills', 'users_skills.id_skill', '=', 'skills.id')
//         .select('skills.id', 'skills.skill')
//         .where({id_user: usrObj.id})
//     })
//     .then( results => {
//       usrObj.skills = results;
//       res.json(usrObj);
//     })
//     .catch( err => {
//       res.status(500).json({message: 'Internal server error'});
//     })
// });

// POST api/users
// orgRouter.post('/', jsonParser, (req, res) => {
//   const knex = require('./db');
//   return knex('users')
//     .insert(req.body)
//     .returning(['id', 'username'])
//     .then( results => {
//       res.status(201).json(results);
//     })
//     .catch( err => {
//       res.status(500).json({message: 'Internal server error'});
//     });
// });

module.exports = { orgRouter };