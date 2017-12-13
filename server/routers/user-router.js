'use strict';

const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { hashPassword } = require('../auth/bcrypt');

process.stdout.write('\x1Bc');

// comm test
userRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// GET api/users/list
userRouter.get('/list', (req, res) => {
  const knex = require('../db');
  return knex
    .select(
      'id',
      'username',
      'location_city as locationCity',
      'location_state as locationState', 
      'first_name as firstName',
      'last_name as lastName',
      'user_type as userType')
    .from ('users')
    .where({user_type: 'individual'})
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
  let usrObj = {};
  const knex = require('../db');
  // get user base info
  return knex('users')
    .select()
    .where({id: req.params.id})
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
      res.json(usrObj);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});

// POST api/users/register
userRouter.post('/register', jsonParser, (req, res) => {
  const knex = require('../db');
  const reqFields = ['username', 'password'];
  const missingField = reqFields.filter( field => !(field in req.body));
  // check for missing username or passwd
  if(missingField.length > 0) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Error: username and password are required'
    });
  }
  // check for dup username
  let inUsrObj = Object.assign( {}, req.body);
  return knex('users')
    .select()
    .where({username: inUsrObj.username})
    .then( results => {
      if(results.length > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
        });
      }
    })    // no dup, insert new user
    .then( () => {
      return hashPassword(inUsrObj.password);
    })
    .then( result => {
      inUsrObj.password = result;
      return knex('users')
        .insert(inUsrObj)
        .returning(['id', 'username'])
        .then( results => {
          res.status(201).json(results);
        });
    })
    .catch( err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = { userRouter };