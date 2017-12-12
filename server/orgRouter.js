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
    .select('id', 'username', 'location_city', 'location_state', 'user_type', 'organization')
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

// GET api/orgs/:id
orgRouter.get('/:id', (req, res) => {
  let orgObj = {};
  const knex = require('./db');
  // get org base info
  return knex('users')
    .select()
    .where({id: req.params.id})
    .then( results => {
      orgObj = (results[0]);
      delete orgObj['passwd'];
      // get org links
      return knex('links')
        .select('id', 'link_type', 'link_url')
        .where({id_user: orgObj.id});
    })
    .then( results => {
      orgObj.links = results;
      // get org causes
      return knex('users_causes')
        .join('causes', 'users_causes.id_cause', '=', 'causes.id')
        .select('causes.id', 'causes.cause')
        .where({id_user: orgObj.id});
    })
    .then( results => {
      orgObj.causes = results;
      // get org opportunities
      return knex('opportunities')
        .select('opportunity_type', 'title', 'narrative')
        .where({id_user: orgObj.id});
    })
    .then( results => {
      orgObj.opps = results;
      res.json(orgObj);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

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