'use strict';

const express = require('express');
const cors = require('cors');
const { PORT, CLIENT_ORIGIN, DATABASE_URL, TEST_DATABASE_URL } = require('./config');
const { userRouter } = require('./userRouter');

const app = express();

console.log('server');
console.log(PORT);
console.log(CLIENT_ORIGIN);
console.log(DATABASE_URL);
console.log(TEST_DATABASE_URL);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api/user', userRouter);

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  runServer();
}

module.exports = { app };