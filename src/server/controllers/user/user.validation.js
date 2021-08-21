import joi from 'joi';

export const createUserValidation = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const userLoginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const passwordResetRequest = joi.object({
  email: joi.string().email().required(),
});
