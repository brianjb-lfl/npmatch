'use strict';

const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { hashPassword } = require('../auth/bcrypt');
const { epHelp } = require('./router-helpers');

process.stdout.write('\x1Bc');

// comm test
userRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// ***** TEST START

// GET api/users/test
userRouter.get('/test', jsonParser, (req, res) => {
  const knex = require('../db');

  let convQuery = epHelp.convertCase(req.query, 'ccToSnake');
  
  const calcUserField = 
    "case when users.organization isnull then "
      + "users.last_name || ', '  || users.first_name "
      + "else users.organization "
      + "end as user_string";
  return knex
    .select(
      'id',
      'username',
      'location_city as locationCity',
      'location_state as locationState', 
      'first_name as firstName',
      'last_name as lastName',
      'organization',
      'user_type as userType',
      knex.raw(calcUserField)
    )
    .from ('users')
    .where(convQuery)
    .orderBy('username')
    .debug(false)
    .then( results => {
      res.json(results);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });    
});

// ***** TEST END

// GET api/users/list
userRouter.get('/list', (req, res) => {
  const knex = require('../db');
  let convQuery = epHelp.convertCase(req.query, 'ccToSnake');
  const calcUserField = 
    "case when users.organization isnull then "
      + "users.last_name || ', '  || users.first_name "
      + "else users.organization "
      + "end as user_string";
  return knex
    .select(
      'id',
      'username',
      'location_city as locationCity',
      'location_state as locationState', 
      'first_name as firstName',
      'last_name as lastName',
      'organization',
      'user_type as userType',
      knex.raw(calcUserField)
    )
    .from ('users')
    .where(convQuery)
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
  return epHelp.buildUser(req.params.id)
    .then( results => {
      if(!results.err) {
        res.json(results);
      }
      else {
        res.status(500).json({message: 'Internal server error'});
      }
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
      let convInUsrObj = epHelp.convertCase(inUsrObj, 'ccToSnake');
      if(convInUsrObj.user_type === 'organization') {
        convInUsrObj = Object.assign( {}, convInUsrObj, {
          password: result,
          first_name: null,
          last_name: null
        });
      }
      else {
        convInUsrObj = Object.assign( {}, convInUsrObj, {
          password: result,
          organization: null,
        });
      }
      return knex('users')
        .insert(convInUsrObj)
        .returning(['id', 'username'])
        .then( results => {
          res.status(201).json(results[0]);
        });
    })
    .catch( err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({message: 'Internal server error'});
    });
});

// Clear test data
userRouter.delete('/clear/test/data', jsonParser, (req, res) => {
  const knex = require('../db');
  return knex('users')
    .where('username', 'like', '%user%')
    .del()
    .then( () => {
      return knex('users')
        .where('username', 'like', '%test%')
        .del()
        .then( () => {
          res.status(200).json({message: 'Test data deleted'});
        });
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });
});


module.exports = { userRouter };