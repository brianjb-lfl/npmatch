'use strict';

const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { localStrategy } = require('./local-strategy');
const { jwtStrategy } = require('./jwt-strategy');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const bodyParser = require('body-parser');
authRouter.use(bodyParser.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

const knex = require('../db');

const createAuthToken = function (user){
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

// comm test
authRouter.get('/testify', jwtAuth, (req, res) => {
  res.status(200).json({message: 'Good to go'});
});

authRouter.post('/login', localAuth, (req, res) => {
  console.log(req.body);
  let user = req.body;
  return knex('users')
    .select()
    .where({username: user.username})
    .then( result => {
      user = Object.assign( {}, user, {
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        user_type: result[0].user_type
      });
      const authToken = createAuthToken(user);
      const { username, firstName, lastName, user_type } = req.body;
      res.json({ authToken, username, firstName, lastName, user_type });
    });
});

authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { authRouter };