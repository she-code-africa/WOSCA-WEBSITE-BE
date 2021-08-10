/* eslint-disable import/prefer-default-export */
import joi from 'joi';

export const createUserValidation = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});
