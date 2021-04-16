import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from '../common/services/logger';
import router from './routes';
import { connectToDB, disconnectDB } from './db';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.json());

process.on('uncaughtException', (err) => {
  logger.warn(err.stack);
  process.exit(1);
});
(async () => {
  await disconnectDB();
})();
// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));
(async () => {
  try {
    await connectToDB();
  } catch (err) {
    logger.warn(err);
  }
})();

const server = app.listen(process.env.PORT || 5000, () => {
  logger.info(`Listening on port ${server.address().port}`);
});

export default app;
