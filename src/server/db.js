import mongoose from 'mongoose';
import env from '../common/config/env';
import logger from '../common/services/logger';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
export const connectToDB = async () => {
  try {
    const productionOrStagingEnvironment = ['production', 'staging'].includes(
      env.app_env,
    );
    await mongoose.connect(env.mongodb_url, {
      ...options,
      ...(productionOrStagingEnvironment && {
        user: env.mongodb_username,
        pass: env.mongodb_password,
      }),
    });
    return logger.info('Database connected!');
  } catch (err) {
    return logger.warn(err);
  }
};
/**
   * Closes all connections in the Mongoose connection pool:
   */
export const disconnectDB = async () => {
  await mongoose.disconnect();
};
