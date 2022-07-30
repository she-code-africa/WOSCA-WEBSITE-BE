import dotenv from 'dotenv';

dotenv.config();

const env = {
  app_env: process.env.NODE_ENV || 'dev',
  base_url: process.env.BASE_URL,
  mongodb_url: process.env.MONGODB_URL,
  mongodb_username: process.env.MONGODB_USERNAME,
  mongodb_password: process.env.MONGODB_PASSWORD,
  mongodb_name: process.env.MONGODB_NAME,
  port: Number(process.env.PORT) || 5050,
  redis_url: process.env.REDIS_URL,
  salt_rounds: process.env.SALT_ROUNDS || 10,
  jwt_secret: process.env.JWT_SECRET,
  mailgun_api_key: process.env.MAILGUN_API_KEY,
  mailgun_domain: process.env.MAILGUN_DOMAIN,
  sca_email: process.env.SCA_EMAIL,
  protocol: process.env.PROTOCOL,
  domain: process.env.DOMAIN,
};
export default env;
