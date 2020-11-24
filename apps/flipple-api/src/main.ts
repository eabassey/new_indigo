
// import * as express from 'express';
const express = require('express');
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';



import applicationRoutes from './app/applications';
import {getConfig} from './app/client-config';

//
const app = express();

//Middleware
app.use(cors())
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());


//
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'configdb';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // findDocuments(db, function() {
  //   client.close();
  // })

  //Custom Headers
  app.use((req, res, next) => {
    res.setHeader("x-4sure", "You should be working for us..");
    // res.removeHeader('x-powered-by');
    next();
  });

  //
  app.use("/config", getConfig(db));
  app.use("/applications", applicationRoutes);


  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to babados!' });
  });

  const port = process.env.port || 3434;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
});



