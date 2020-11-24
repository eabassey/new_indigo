import * as express from 'express';
import {AppConfig, ClientConfig} from '@wilo';
import { getClientHandler } from './handlers/get-client.handler';

const router = express.Router();


const getConfig = (db) => {
  return router.get('/', getClientHandler);
}


export {getConfig};
