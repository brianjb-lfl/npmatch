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
const { testSetup } = require('./test-setup');
const { testData } = require('./test-data');
const { testF } = require('./test-helpers');
const expect = chai.expect;

chai.use(chaiHttp);

describe('opp', function() {

  before(function() {
    return (testSetup.tearDownDB())
      .then( () => {
        return (testSetup.buildFullDB());
      });
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

  // ***** COMM TEST
  describe('api/opps/testify GET comm check', function() {
    it('should demonstrate that comm to the endpoint is working', function() {
      return chai.request(app)
        .get('/api/causes/testify')
        .then(function(res) {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Good to go');
        });
    });
  });

  // ***** GET OPPORTUNITY LIST
  describe('api/opps/list GET opportunities list', function() {
    it('should return a list of opportunities', function() {
      return chai.request(app)
        .get('/api/opps/list')
        .then(function(res) {
          let oppStrings = testData.oppSeeds.map( item => item.narrative );
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(oppStrings.length);
          for(let oCtr = 0; oCtr < res.body.length; oCtr += 1) {
            expect(oppStrings).to.include(res.body[oCtr].narrative);
          }
          // expect(res.body[0].narrative).to.equal('out, out, damned spot!');    // failing test
        });
    });
  });

  // ***** POST A NEW ORG OPPORTUNITY
  describe('api/opps POST new opportunity', function() {
    it.only('should add an opportunity', function() {
      let testOpp = testData.testOrgOpp;
      return testF.getFocusOrg()
        .then( result => {
          console.log(result);
          testOpp = Object.assign( {}, testOpp, {
            id_user: result.focus_org_id
          });
          console.log(testOpp);
          return chai.request(app)
            .post('/api/opps')
            .send(testOpp)
        })
        .then( res => {
          expect(res.status).to.be(201);
          return knex('opportunities')
            .select()
            .where({id: res.id})
        })
        .then( results => {
          expect(results.length).to.equal(1);
          expect(results.id_user).to.equal(testOpp.id_user);
          expect(results.offer).to.be(false);
          expect(results.title).to.equal(testOpp.title);
          expect(results.narrative).to.equal(testOpp.narrative);
        });
    });
  });




});

