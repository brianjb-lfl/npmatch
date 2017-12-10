'use strict';

const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

process.stdout.write('\x1Bc');

// comm test
userRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// GET api/users/list
userRouter.get('/list', (req, res) => {
  const knex = require('./db');
  return knex
    .select('username', 'location_city', 'location_state', 
      'first_name', 'last_name', 'user_type', 'organization')
    .from ('users')
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
userRouter.get('/:id', (req, res) => {
  let usrObj = {}
  const knex = require('./db');
  // get user base info
  return knex('users')
    .select()
    .where({id: req.params.id})
    .then( results => {
      usrObj = ({...results[0]});
      // get user links
      return knex('links')
        .select('id', 'link_type', 'link_url')
        .where({id_user: usrObj.id})
    })
    .then( results => {
      results.forEach( item => {
        usrObj.links = results;
      })
      // get user causes
      return knex('users_causes')
        .join('causes', 'users_causes.id_cause', '=', 'causes.id')
        .select('causes.id', 'causes.cause')
        .where({id_user: usrObj.id})
    })
    .then( results => {
      console.log(results);
      usrObj.causes = results;
      console.log(usrObj);
      res.json(usrObj);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    })
});

// POST api/users
userRouter.post('/', jsonParser, (req, res) => {
  const knex = require('./db');
  return knex('users')
    .insert(req.body)
    .returning(['id', 'username'])
    .then( results => {
      res.status(201).json(results);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = { userRouter };