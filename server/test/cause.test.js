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
const { testF } = require('./testHelpers');
const expect = chai.expect;

chai.use(chaiHttp);

describe('cause', function() {

  before(function() {
    return (testSetup.buildFullDB())
  });

  after(function() {
    //setDbMode('dev');
    return (testSetup.tearDownDB())
      .then( () => {
        //restore .env DB_MODE to dev
        setDbMode('dev');
      });
  });

  beforeEach(function() {

  });

  afterEach(function() {

  });

  // ***** GET CAUSE LIST
  describe('api/causes/list GET cause list', function() {
    it('should return a list of existing causes', function() {
      return chai.request(app)
        .get('/api/causes/list')
        .then(function(res) {
          let causeStrings = testData.causeSeeds.map( item => item.cause );
          expect(res.body.length).to.equal(causeStrings.length);
          for(let cCtr = 0; cCtr < res.body.length; cCtr++) {
            expect(causeStrings).to.include(res.body[cCtr].cause);
          }
          // expect(res.body[0].cause).to.equal('cowboyfans');    // failing test
        });
    });
  });

  // ***** GET OPPORTUNITIES BY CAUSE LIST


});
