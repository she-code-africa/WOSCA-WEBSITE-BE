import logger from '../../common/services/logger';

export const errorResponse = (res, req, status, error) => {
  res.status(status).json({
    errors: error,
  });
  logger.error(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

export const successResponse = (res, req, status, data) => {
  res.status(status).json({
    data,
  });
  logger.info(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};
