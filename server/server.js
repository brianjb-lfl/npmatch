'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { userRouter } = require('./routers/user-router');
const { orgRouter } = require('./routers/org-router');
const { oppRouter } = require('./routers/opp-router');
const { causeRouter } = require('./routers/cause-router');
const { adminRouter } = require('./routers/admin-router');
const { authRouter } = require('./auth/auth-router');
const { roleRouter } = require('./routers/role-router');
const { responseRouter } = require('./routers/response-router');


const app = express();
app.use(morgan('common', { skip: () => process.env.DB_MODE === 'test'}));

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.static('../client/public')); 
//app.get('/', (req, res) => { res.sendFile(__dirname + '/views/index.html'); });
app.use('/api/users', userRouter);
app.use('/api/orgs', orgRouter);
app.use('/api/opportunities', oppRouter);
app.use('/api/causes', causeRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/roles', roleRouter);
app.use('/api/responses', responseRouter);

app.use('*', (req, res) => {
  return res.status(404).json({message: 'test'});
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