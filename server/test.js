'use strict';

const { setDbMode } = require('./config');
// set .env DB_MODE to test to point knex instances to test db
setDbMode('test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const { work } = require('./work');
const { testSetup } = require('./testSetup');
const { testData } = require('./testData');
const expect = chai.expect;
const knex = require('./db');

chai.use(chaiHttp);

describe('work', function() {

  before(function() {

  });

  after(function() {
    // restore .env DB_MODE to dev
    setDbMode('dev');
  });

  beforeEach(function() {
    return (testSetup.addUserTable())
      .then( () => {
        return testData.seedUserTable();
      });
  });

  afterEach(function() {

  });


  // ***** SELECT USERS
  describe('select users', function() {
    it('should return existing users', function() {
      return work.getUsers()
        .then(function(res) {
          let userNames = testData.userSeeds.map( item => item.username );
          expect(res.length).to.equal(2);
          expect(userNames).to.include(res[0].username);
          expect(userNames).to.include(res[1].username);
        });
    });
  });

  // ***** POST USER
  // describe('add user', function() {
  //   it('should add user to users table', function() {
  //     return chai.request(work)
  //       .addUser()
  //       .then(function (res) {         // expect res.rowCount = 1
  //         expect(res.command).to.equal('INSERT');
  //         expect(res.rowCount).to.equal(1);
  //         return work.getUsers()
  //           .then(function (res) {

  //           });
  //       });
  //   });
  // });

});

