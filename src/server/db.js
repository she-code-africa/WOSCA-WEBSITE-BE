import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../common/services/logger';

dotenv.config();
const env = process.env.NODE_ENV || 'dev';

const environment = {
  staging: {
    use_env_variable: 'MONGODB_URL',
  },
  test: {
    use_env_variable: 'TEST_MONGODB_URL',
  },
  production: {
    use_env_variable: 'MONGODB_URL',
  },
};
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env[environment[env].use_env_variable], options);
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
