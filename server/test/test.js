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

describe('user', function() {

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

  // ***** GET USER LIST
  describe('api/users/list GET user list', function() {
    it('should return a list of existing users', function() {
      return chai.request(app)
        .get('/api/users/list')
        .then(function(res) {
          let userNames = testData.userSeeds.map( item => item.username );
          expect(res.body.length).to.equal(testData.userSeeds.length);
          for(let uCtr = 0; uCtr < testData.userSeeds.length; uCtr++) {
            expect(userNames).to.include(res.body[uCtr].username);
          }
          //expect(res.body[0].username).to.equal('kaisersolze');    // failing test
        });
    });
  });

  // ***** GET INDIVIDUAL USER - DETAIL
  describe('api/users/:id GET user details', function() {
    it('should return the users profile info, links, causes, and skills', function() {
      let focusUser = {};
      return testF.getFocusUser()
        .then ( results => {
          focusUser = results;
          return chai.request(app)
            .get(`/api/users/${focusUser.focus_user_id}`)
        })
        .then( res => {
          // test general user info
          expect(res.body.username).to.equal(focusUser.username);
          // test user links
          expect(res.body.links.length).to.equal(testData.testUserLinks.length);
          //expect(res.body.links.length).to.equal(99);   // failing test
          const expUserLinksArr = testData.testUserLinks.map( item => item.link_url);
          for(let lCtr = 0; lCtr < res.body.links.length; lCtr++) {
            expect(expUserLinksArr).to.include(res.body.links[lCtr].link_url);
          }
          // test user causes
          expect(res.body.causes.length).to.equal(testData.testUserCauses.length);
          // expect(res.body.causes.length).to.equal(98);    // failing test
          const expUserCausesArr = testData.testUserCauses.map( item => item.cause);
          for(let cCtr = 0; cCtr < res.body.causes.length; cCtr++) {
            expect(expUserCausesArr).to.include(res.body.causes[cCtr].cause);
          }
          // test user skills
          expect(res.body.skills.length).to.equal(testData.testUserSkills.length);
          // expect(res.body.skills.length).to.equal(97);    // failing test
          const expUserSkillsArr = testData.testUserSkills.map( item => item.skill);
          for(let sCtr = 0; sCtr < res.body.skills.length; sCtr++) {
            expect(expUserSkillsArr).to.include(res.body.skills[sCtr].skill);
          }
        })
    })
  });

  // ***** POST USER
  describe('api/users POST new user', function() {

    it('should add user to users table as type individual', function() {
      const testUser = testData.testIndividual;

      return chai.request(app)
        .post('/api/users')
        .send(testUser)
        .then(function(res) {
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.equal(testData.testIndividual.username);
          return chai.request(app)
            .get('/api/users/res.body[0].id')
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

