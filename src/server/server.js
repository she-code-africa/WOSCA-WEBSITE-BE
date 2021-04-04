import '@babel/polyfill';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Debug from 'debug';
import logger from 'morgan';
import router from './routes';

if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();
const debug = Debug(process.env.DEBUG);

app.use(cors());
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.json());

process.on('uncaughtException', (err) => {
  debug(err.stack);
  process.exit(1);
});

// Handle non existing routes
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

const server = app.listen(process.env.PORT || 5000, () => {
  debug(`Listening on port ${server.address().port}`);
});

export default app;
