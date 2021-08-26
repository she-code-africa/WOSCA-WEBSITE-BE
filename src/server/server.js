import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from '../common/config/env';
import logger from '../common/services/logger';
import router from './routes';
import { connectToDB, disconnectDB } from './db';
import { serverErrorResponse } from './utils/responsehandler';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to WOSCA site API' }));
app.use('/api/v1', router);
app.use(express.json());

process.on('uncaughtException', (err) => {
  logger.warn(err || err.stack);
  process.exit(1);
});
(async () => {
  await disconnectDB();
})();

app.use(serverErrorResponse);

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist',
}));
(async () => {
  try {
    await connectToDB();
  } catch (err) {
    logger.warn(err);
  }
})();

const server = app.listen(env.port, () => {
  logger.info(`Listening on port ${server.address().port}`);
});

export default app;
