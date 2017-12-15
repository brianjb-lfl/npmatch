'use strict';

const express = require('express');
const oppRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

process.stdout.write('\x1Bc');

// comm test
oppRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

//GET api/opps/list
oppRouter.get('/list', (req, res) => {
  const knex = require('../db');
  const calcUserField = 
    "case when users.organization isnull then "
      + "users.last_name || ', '  || users.first_name "
      + "else users.organization "
      + "end as user_string";
  return knex('opportunities')
    .join('users', 'opportunities.id_user', '=', 'users.id')
    .select(
      'opportunities.id',
      'users.id',
      'opportunity_type as opportunityType',
      'users.username',
      'opportunities.id_user',
      'offer',
      'title',
      'narrative',
      'timestamp_start',
      'timestamp_end',
      'opportunities.location_city',
      'opportunities.location_state',
      'opportunities.location_country',
      'id_user',
      'link',
      knex.raw(calcUserField)
    )
    .orderBy('user_string')
    .orderBy('timestamp_start')
    .debug(false)
    .then( results => {
      res.json(results);
    })
    .catch( err => {
      res.status(500).json({message: 'Internal server error'});
    });    
});

// POST api/opps
oppRouter.post('/', jsonParser, (req, res) => {
  let inOppObj = req.body;
  const knex = require('../db');
  const reqFields = ['opportunityType', 'title', 'narrative', 'idUser'];
  const missingField = reqFields.find( field => !(field in inOppObj));
  
  //check for missing fields
  if(missingField) {
    console.log('handling missing field');
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  inOppObj = Object.assign( {}, inOppObj, {
    opportunity_type: inOppObj.opportunityType,
    id_user: inOppObj.idUser,
    location_city: inOppObj.locationCity ? inOppObj.locationCity : null,
    location_state: inOppObj.locationState ? inOppObj.locationState : null,
    location_country: inOppObj.locationCountry ? inOppObj.locationCountry : null,
  });

  delete inOppObj.opportunityType;
  delete inOppObj.idUser;
  inOppObj.locationCity ? delete inOppObj.locationCity : null;
  inOppObj.locationState ? delete inOppObj.locationState : null;
  inOppObj.locationCountry ? delete inOppObj.locationCountry : null;
  
  return knex('opportunities')
    .insert(inOppObj)
    .returning(['id', 'opportunity_type as opportunityType', 'narrative'])
    .then( results => {
      res.status(201).json(results[0]);
    })
    .catch( err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = { oppRouter };
