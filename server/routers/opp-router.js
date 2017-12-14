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

module.exports = { oppRouter };