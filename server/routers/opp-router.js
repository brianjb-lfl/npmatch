'use strict';

const express = require('express');
const passport = require('passport');
const { jwtStrategy } = require('../auth/jwt-strategy');
const oppRouter = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

process.stdout.write('\x1Bc');

passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', { session: false });

// comm test
oppRouter.get('/testify/', (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

// secured comm test
oppRouter.get('/testify/secure', jwtAuth, (req, res) => {
  res.status(200).json({message: 'Good to go - *SECURED*'});
});

//GET api/opps/list
oppRouter.get('/list', jwtAuth, (req, res) => {
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
oppRouter.post('/', jwtAuth, jsonParser, (req, res) => {
  let inOppObj = req.body;
  let retObj = {};
  let causesInArr = inOppObj.causes.slice();
  let causesPostArr = [];
  const knex = require('../db');
  const reqFields = ['title', 'narrative', 'userId', 'causes'];
  const missingField = reqFields.find( field => !(field in inOppObj));
  
  // check for missing fields
  if(missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }
  // camelCase to snake_case conversion
  inOppObj = Object.assign( {}, inOppObj, {
    opportunity_type: inOppObj.opportunityType ? inOppObj.opportunityType : null,
    id_user: inOppObj.userId,
    location_city: inOppObj.locationCity ? inOppObj.locationCity : null,
    location_state: inOppObj.locationState ? inOppObj.locationState : null,
    location_country: inOppObj.locationCountry ? inOppObj.locationCountry : null,
    timestamp_start: inOppObj.timestampStart ? inOppObj.timestampStart : null,
    timestamp_end: inOppObj.timestampEnd ? inOppObj.timestampEnd : null,
  });

  delete inOppObj.opportunityType;
  delete inOppObj.userId;
  delete inOppObj.locationCity;
  delete inOppObj.locationState;
  delete inOppObj.locationCountry;
  delete inOppObj.timestampStart;
  delete inOppObj.timestampEnd;
  delete inOppObj.causes;
  
  // post base opportunity info - get id
  return knex('opportunities')
    .insert(inOppObj)
    .returning(['id', 'opportunity_type as opportunityType', 'narrative'])

    .then( results => {
      // save return info for client response
      retObj = Object.assign( {}, results[0]);

      if(causesInArr.length > 0) {
        // need to add opp - cause link records
        // get all causes and id's for lookup
        return knex('causes')
          .select('id', 'cause')
          .then( allCauses => {
            // loop through causes in req, add item to postArr for each
            causesInArr.forEach( cItem => {
              let tempCItem = allCauses.filter( item => item.cause === cItem )[0];
              causesPostArr.push(
                Object.assign( {}, {
                  id_opp: retObj.id,
                  id_cause: tempCItem.id
                })
              );
            });
            return knex('opportunities_causes')
              .insert(causesPostArr);
          });
      }
      else {
        // no causes in req, skip to response
        return;
      }
    })
    .then( () => {
      res.status(201).json(retObj);
    })
    .catch( err => {
      if(err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = { oppRouter };
