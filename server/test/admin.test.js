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

  // ***** INITIALIZE
  describe('api/admin/initialize GET list', function() {
    it('should switch dbMode to dev', function() {
      console.log('add your config test');
    });
    
    it('should return a list of existing causes, skills and opportunities', function() {
      return chai.request(app)
        .get('/api/admin/initialize')
        .then(function(res) {
          console.log(res.body);
          // check causes
          let causeStrings = testData.causeSeeds.map( item => item.cause );
          expect(res.body.causes.length).to.equal(causeStrings.length);
          for(let cCtr = 0; cCtr < res.body.causes.length; cCtr++) {
            expect(causeStrings).to.include(res.body.causes[cCtr]);
          }
          // expect(res.body[0]).to.equal('cowboyfans');    // failing test
          // check skills
          let skillStrings = testData.skillSeeds.map( item => item.skill );
          expect(res.body.skills.length).to.equal(skillStrings.length);
          for(let sCtr = 0; sCtr < res.body.causes.length; sCtr++) {
            expect(skillStrings).to.include(res.body.skills[sCtr]);
          }
          // expect(res.body[0]).to.equal('cat juggler extraordinaire');    // failing test
          // check users
          expect(res.body.users.length).to.equal(testData.userSeeds.length);
          res.body.users.forEach( usrObj => {
            let tempSeedUser = testData.userSeeds.filter( item => item.username === usrObj.username);
            expect(tempSeedUser.length).to.equal(1);    // tests username = seed username
            expect(usrObj.userType).to.equal(tempSeedUser[0].user_type);
            expect(usrObj.locationCity).to.equal(tempSeedUser[0].location_city);
          })
        });
    });
  });

  // ***** GET OPPORTUNITIES BY CAUSE LIST


});

