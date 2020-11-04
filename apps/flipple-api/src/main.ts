
// import * as express from 'express';
const express = require('express');
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';


import applicationRoutes from './app/applications';
import configRoutes from './app/client-config';

//
const app = express();

//Middleware
app.use(cors())
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());



//Custom Headers
app.use((req, res, next) => {
  res.setHeader("x-4sure", "You should be working for us..");
  // res.removeHeader('x-powered-by');
  next();
});

//
app.use("/config", configRoutes);
app.use("/applications", applicationRoutes);


app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to babados!' });
});

const port = process.env.port || 3434;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
