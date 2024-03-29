import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from '../common/config/env';
import logger from '../common/services/logger';
// eslint-disable-next-line import/no-named-as-default-member
import router from './routes';
import { connectToDB, disconnectDB } from './db';

const start = async () => {
  try {
    const app = express();

    // setup server-level middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    // expose index endpoint
    app.get('/', (req, res) => res.status(200).send({ message: 'Welcome to WOSCA site API' }));
    app.use('/api/v1', router);

    // Handle non existing routes
    app.use((req, res) => {
      res.status(404).send({ message: 'Route not found' });
      logger.info(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    });
    (async () => {
      await disconnectDB();
      // await quit();
    })();
    (async () => {
      await connectToDB();
    })();

    const server = app.listen(env.port, () => {
      logger.info(`Listening on port ${server.address().port}`);
    });
  } catch (error) {
    logger.error(error, 'Fatal server error');
    process.exit(1);
  }
};
start();
