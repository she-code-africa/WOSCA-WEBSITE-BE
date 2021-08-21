import redis from 'redis';
import { promisify } from 'util';
import env from './env';
import logger from '../services/logger';

const redisClient = redis.createClient(env.redis_url);

redisClient.on('ready', async () => {
  logger.info('Redis Connected!');
});

redisClient.on('error', (err) => {
  logger.error(err, 'An error occured with the Redis client.');
});

export const set = promisify(redisClient.set).bind(redisClient);
export const get = promisify(redisClient.get).bind(redisClient);
export const quit = promisify(redisClient.quit).bind(redisClient);
