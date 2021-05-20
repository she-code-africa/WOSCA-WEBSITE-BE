import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';
import logger from '../../common/services/logger';

const parseError = (error = ValidationError) => {
  const parsedError = error.details.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.context.key]: curr.message,
    }),
    {},
  );
  return parsedError;
};

const validate = (data, schema) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (!error) {
    return {
      err: null,
      value,
    };
  }

  return {
    err: parseError(error),
    value: null,
  };
};

export default (
  schema,
  context = 'body' || 'query',
) => (req, res, next) => {
  const { err, value } = validate(req[context], schema);

  if (!err) {
    req[context] = value;
    return next();
  }
  logger.warn(err);
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    err,
  });
};
