'use strict';

const express = require('express');
const cors = require('cors');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { userRouter } = require('./userRouter');
const { orgRouter } = require('./orgRouter');
const { causeRouter } = require('./causeRouter');
const { adminRouter } = require('./adminRouter');

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api/users', userRouter);
app.use('/api/orgs', orgRouter);
app.use('/api/causes', causeRouter);
app.use('/api/admin', adminRouter);

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