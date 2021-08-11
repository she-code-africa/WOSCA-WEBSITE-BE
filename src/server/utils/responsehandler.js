import HttpStatus from 'http-status-codes';
import logger from '../../common/services/logger';

export const getHTTPErrorCode = (err) => {
  // check if error code exists and is a valid HTTP code.
  if (err.code >= 100 && err.code < 600) return err.code;
  return HttpStatus.INTERNAL_SERVER_ERROR;
};
export const errorResponse = (res, req, status, error) => {
  res.status(status).json({
    errors: error,
  });
  logger.error(`${error}  ${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

export const successResponse = (res, req, status, data) => {
  res.status(status).json({
    data,
  });
  logger.info(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};
