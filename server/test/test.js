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
  // describe('api/users/list GET user list', function() {
  //   it('should return a list of existing users', function() {
  //     return chai.request(app)
  //       .get('/api/users/list')
  //       .then(function(res) {
  //         let userNames = testData.userSeeds.map( item => item.username );
  //         expect(res.body.length).to.equal(testData.userSeeds.length);
  //         for(let uCtr = 0; uCtr < testData.userSeeds.length; uCtr++) {
  //           expect(userNames).to.include(res.body[uCtr].username);
  //         }
  //         //expect(res.body[0].username).to.equal('kaisersolze');   // failing test
  //       });
  //   });
  // });

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
          console.log(res.body);
          expect(res.body.username).to.equal(focusUser.username);
          expect(res.body.links.length).to.equal(testData.testUserLinks.length);
          const expUserLinksArr = testData.testUserLinks.map( item => item.link_url);
          for(let lCtr = 0; lCtr < res.body.links.length; lCtr++) {
            expect(expUserLinksArr).to.include(res.body.links[lCtr].link_url);
          }
        })
    })
  });

  
  
  //   // base user info
  //   // array of links - links, id_user = id
  //   // array of causes - users_causes - id_user = id, id_cause = causes id
  //   // array of skills - users_skills - id_user = id,  id_skill = skills id 
  //   // array of responses - responses, id_user = id, id_opp = opportunities id, id_user = orgs id
  //   // array of adminOf - roles - id_user_receiving = id, id_user_adding = id of org where capabilities = admin
  //   // array of followingroles - id_user_receiving = id, id_user_adding = id of org where capabilities = admin


  // ***** POST USER
  // describe('api/users POST new user', function() {

  //   it('should add user to users table as type individual', function() {
  //     const testUser = testData.testIndividual;

  //     return chai.request(app)
  //       .post('/api/users')
  //       .send(testUser)
  //       .then(function(res) {
  //         expect(res.body.length).to.equal(1);
  //         expect(res.body[0].username).to.equal(testData.testIndividual.username);
  //       })

  //       .then( () => {
  //         return chai.request(app)
  //           .get('/api/users/list')
  //           .then(function(res) {
  //             expect(res.body.length).to.equal(1);
  //             expect(res.body[0].user_type).to.equal('individual');
  //             expect(res.body[0].first_name).to.equal(testData.testIndividual.first_name);
  //             expect(res.body[0].last_name).to.equal(testData.testIndividual.last_name);
  //             expect(res.body[0].organization).to.equal('');
  //           });
  //       });
  //   });
  // });

});

