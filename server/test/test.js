'use strict';

const { setDbMode } = require('../config');
// set .env DB_MODE to test to point knex instances to test db
setDbMode('test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { userRouter } = require('../userRouter');
const { testSetup } = require('./testSetup');
const { testData } = require('./testData');
const expect = chai.expect;
const knex = require('../db');

chai.use(chaiHttp);

describe('work', function() {

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


  // ***** SELECT USERS
  // describe('select users', function() {
  //   it('should return existing users', function() {
  //     return testData.seedUserTable()
  //       .then( () => {
  //         return work.getUsers()
  //           .then(function(res) {
  //             let userNames = testData.userSeeds.map( item => item.username );
  //             expect(res.length).to.equal(2);
  //             expect(userNames).to.include(res[0].username);
  //             expect(userNames).to.include(res[1].username);
  //           });
  //       });
  //   });
  // });

  // ***** POST USER
  describe('add user', function() {
    it('should add user to users table as type individual', function() {
      return work.addIndivUser(testData.testIndividual)
        .then( res => {
          console.log('insert response ...');
          console.log(res);
          expect(res.length).to.equal(1);
          expect(res[0].username).to.equal(testData.testIndividual.username);
          return work.getUsers()
            .then( res => {
              console.log('get response ...');
              console.log(res);
              expect(res.length).to.equal(1);
              expect(res[0].user_type).to.equal('individual');
              expect(res[0].first_name).to.equal(testData.testIndividual.first_name);
              expect(res[0].last_name).to.equal(testData.testIndividual.last_name);
              expect(res[0].organization).to.equal('');
            });
        });
    });
  });

});

