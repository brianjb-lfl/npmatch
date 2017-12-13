'use strict';

const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { localStrategy } = require('./localStrategy');
const { jwtStrategy } = require('./jwtStrategy');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const bodyParser = require('body-parser');
authRouter.use(bodyParser.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

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
  const authToken = createAuthToken(req.body);
  const { username, firstName, lastName } = req.body;
  res.json({ authToken, username, firstName, lastName });
});

authRouter.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { authRouter };