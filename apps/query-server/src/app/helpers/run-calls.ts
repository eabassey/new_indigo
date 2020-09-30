import * as url from 'url';
import * as axios from 'axios';
import * as zipkinInstrumentationAxios from 'zipkin-instrumentation-axios';
import {runQuery} from './run-query';
import * as express from 'express';
import * as zipkin from 'zipkin';
import {Endpoint} from '../models/foursure.config';


export const runCalls = (req: express.Request, item: Endpoint, tracer: zipkin.Tracer) => {
    // console.log(req.headers)
    return item.backends.map(backend => {
      // console.log({headers: req.headers});
      // Add axios instrumentation
      let zipkinAxios = zipkinInstrumentationAxios(
        axios, 
        { tracer, serviceName: url.parse(backend.url).pathname }
        );
      const axiosData = {
        url: backend.url,
        headers: {},
        method: item.method || "get"
      };
  
      // FOWARED HEADERS TO BACKENDS
      if(req.headers['authorization']) {
        axiosData.headers['authorization'] = req.headers['authorization'];
      }
      if (item.headers_to_pass) {
        item.headers_to_pass.forEach(header => {
          axiosData.headers[header] = req.headers[header];
        });
      }
  
      // ADD PARAMS
      if (req.params) {
        axiosData["params"] = backend.params;
      }
  
      // ADD DATA (BODY)
      if (backend.data) {
        axiosData["data"] = backend.data;
      }
  
      switch(axiosData.method) {
        case 'get' || 'GET': {
          return zipkinAxios.get(axiosData.url, axiosData)
          .then(response => {
            // console.log({ check: response.data });
            const result = backend.query ? runQuery(backend.query, response.data) : response.data;
            return backend.group? {[backend.group]: result} : result;
          })
          .catch(err => console.error({ err }));
        }
  
        case 'post' || 'POST': {
          return zipkinAxios.post(axiosData.url, axiosData['data'], axiosData)
          .then(response => {
            // console.log({ check: response.data });
            const result = backend.query ? runQuery(backend.query, response.data) : response.data;
            return backend.group? {[backend.group]: result} : result;
          })
          .catch(err => console.error({ err }));
        }
  
        case 'put' || 'PUT': {
          return zipkinAxios.put(axiosData.url, axiosData['data'], axiosData)
          .then(response => {
            // console.log({ check: response.data });
            const result = backend.query ? runQuery(backend.query, response.data) : response.data;
            return backend.group? {[backend.group]: result} : result;
          })
          .catch(err => console.error({ err }));
        }
  
        default: {
          return zipkinAxios.get(axiosData.url)
          .then(response => {
            // console.log({ check: response.data });
            const result = backend.query ? runQuery(backend.query, response.data) : response.data;
            return backend.group? {[backend.group]: result} : result;
          })
          .catch(err => console.error({ err }));
        }
      }
      
    });
  };