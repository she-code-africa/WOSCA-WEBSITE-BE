/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createEventValidation = joi.object({
  name: joi.string().required(),
  location: joi.string().required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
  description: joi.string().required(),
});
