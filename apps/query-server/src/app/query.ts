import * as express from 'express';
import mergeAll from 'ramda/src/mergeAll';
import * as httpTracer from 'http-tracer';
import {runCalls} from './helpers/run-calls';
import * as zipkin from 'zipkin';
import { FoursureConfig } from './models/foursure.config';

// const { toXML } = require('jstoxml');



const queryFunc = (foursureConfig: FoursureConfig, tracer: zipkin.Tracer) => {
  const router = express.Router();

  foursureConfig.endpoints.forEach(item => {
    router.get(item.endpoint, async (req, res) => {
      //
      const opts = runCalls(req, item, tracer);

      const result = await Promise.all(opts);
      const mergedResult = mergeAll(result);

      // Turn of HTTP Tracing
      if (foursureConfig.console_debug) {
        httpTracer.disable();
      }
      return res.json(mergedResult);
    });
  });

  router.post("/api/query", async(req, res) => {

    const item = req.body;
    const opts = runCalls(req, item, tracer);

      const result = await Promise.all(opts);
      const mergedResult = mergeAll(result);

      // Turn of HTTP Tracing
      if (foursureConfig.console_debug) {
        httpTracer.disable();
      }
      return res.json(mergedResult);
  });

  return router;
};

export default queryFunc;
