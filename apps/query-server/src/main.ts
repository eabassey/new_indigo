
// import * as express from 'express';
const express = require('express');
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';
import {Tracer, ExplicitContext, ConsoleRecorder, BatchRecorder, jsonEncoder} from 'zipkin';
import {expressMiddleware as zipkinMiddleware } from 'zipkin-instrumentation-express';
import {HttpLogger} from 'zipkin-transport-http';
import {FoursureConfig} from './app/models/foursure.config';

const localServiceName = 'BABADOS'; // name of this application
// const tracer = new Tracer({ctxImpl, recorder, localServiceName});

const ZIPKIN_ENDPOINT = process.env.ZIPKIN_ENDPOINT || "http://localhost:9411";

// Get ourselves a zipkin tracer
const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${ZIPKIN_ENDPOINT}/api/v2/spans`,
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  }),
  localServiceName,
});
// console.log({env: process.env});
//
const foursureConfig: FoursureConfig = require(`./configs/${process.env.FOURSURE_CLIENT_ID}.foursure.json`) //require(args[0]);
// const foursureConfig: FoursureConfig = require(args[0]);
import useQuery from './app/query';
const httpTracer = require('http-tracer');


const app = express();

//Middleware
// Add the Zipkin middleware
// app.use(cors(foursureConfig.config.cors));
app.use(cors())
app.use(helmet());
app.use(compression());
app.use(zipkinMiddleware({tracer}));
app.use(bodyParser.json());


// HTTP Tracing
if (foursureConfig.console_debug) {
  httpTracer.enable();
}

//Custom Headers
app.use((req, res, next) => {
  res.setHeader("x-4sure", "You should be working for us..");
  // res.removeHeader('x-powered-by');
  next();
});

app.use("/", useQuery(foursureConfig, tracer));

app.get("/__discovery", (req, res) => {
  res.json(foursureConfig);
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to babados!' });
});

const port = process.env.port || foursureConfig.port || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
