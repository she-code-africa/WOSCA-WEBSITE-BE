/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createProgramValidation = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
});
