'use strict';

const express = require('express');
const adminRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

process.stdout.write('\x1Bc');

// comm test
adminRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// GET api/admin/initialize
adminRouter.get('/initialize', (req, res) => {
  let resObj = {};
  let causeArr = [];
  let skillArr = [];
  let userArr = [];
  const knex = require('../db');
  return knex
    .select('cause')
    .from ('causes')
    .orderBy('cause')
    .debug(false)
    .then( results => {
      causeArr = results.map( item => item.cause);
      return knex
        .select('skill')
        .from('skills')
        .orderBy('skill')
        .debug(false);
    })
    .then( results => {
      skillArr = results.map( item => item.skill);
      return knex
        .select(
          'id',
          'username', 
          'location_city as locationCity', 
          'location_state as locationState',
          'location_country as locationCountry', 
          'bio',
          'logo',
          'user_type as userType')
        .from('users')
        .where({user_type: 'organization'})
        .orderBy('organization')
        .orderBy('last_name')
        .orderBy('first_name')
        .debug(false);
    })
    .then( results => {
      userArr = results.map( item => item );
      resObj = Object.assign( {}, {
        causes: causeArr,
        skills: skillArr,
        users: userArr
      });
      res.json(resObj);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });    
});
//id, organization, bio, logo, all location fields, links, causes


// GET api/causes/oppslist


module.exports = { adminRouter };