'use strict';

const path = require('path');
const dotEnvPath = path.resolve('../../.env');
require('dotenv').config({path: dotEnvPath});

const { setDbMode } = require('../config');
// set .env DB_MODE to test to point knex instances to test db
setDbMode('test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server');
const { testSetup } = require('./testSetup');
const { testData } = require('./testData');
const expect = chai.expect;

chai.use(chaiHttp);

describe('user', function() {

  before(function() {

  });

  after(function() {
    // restore .env DB_MODE to dev
    setDbMode('dev');
  });

  beforeEach(function() {
    return (testSetup.addUserTable());
  });

  afterEach(function() {

  });

  // ***** GET USER LIST
  describe('api/user/list GET user list', function() {

    it('should return a list of existing users', function() {
      return testData.seedUserTable()

        .then( () => {
          return chai.request(app)
            .get('/api/user/list')
            .then(function(res) {
              let userNames = testData.userSeeds.map( item => item.username );
              expect(res.body.length).to.equal(2);
              expect(userNames).to.include(res.body[0].username);
              expect(userNames).to.include(res.body[1].username);
            });
        });
    });
  });

  // ***** POST USER
  describe('api/user POST new user', function() {

    it('should add user to users table as type individual', function() {
      const testUser = testData.testIndividual;

      return chai.request(app)
        .post('/api/user')
        .send(testUser)
        .then(function(res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.equal(testData.testIndividual.username);
        })

        .then( () => {
          return chai.request(app)
            .get('/api/user/list')
            .then(function(res) {
              expect(res.body.length).to.equal(1);
              expect(res.body[0].user_type).to.equal('individual');
              expect(res.body[0].first_name).to.equal(testData.testIndividual.first_name);
              expect(res.body[0].last_name).to.equal(testData.testIndividual.last_name);
              expect(res.body[0].organization).to.equal('');
            });
        });
    });
  });
});

