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

// api/user/list
userRouter.get('/list', (req, res) => {
  const knex = require('./db');
  return knex
    .select('username', 'location_city', 'location_state', 
      'first_name', 'last_name', 'user_type', 'organization')
    .from ('users')
    .orderBy('username')
    .debug(false)
    .then( results => {
      knex.destroy();
      console.log('database connection closed');
      res.json(results);
    });

});









module.exports = { userRouter };