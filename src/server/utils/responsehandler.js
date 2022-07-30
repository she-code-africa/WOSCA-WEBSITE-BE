import logger from '../../common/services/logger';

export const errorResponse = (res, message, statusCode = 500, req) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
  logger.error(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

export const successResponse = (res, statusCode, status, data = {}, req) => {
  res.status(statusCode).json({
    success: status,
    data,
  });
  logger.info(`${res.statusCode} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
};

export const paginatedOptions = (query) => {
  const page = Number(query.page) - 1 || 0;
  const per_page = Number(query.per_page) || 20;
  const offset = page * per_page;
  const data = [{ $skip: offset }, { $limit: per_page }];

  return data;
};
