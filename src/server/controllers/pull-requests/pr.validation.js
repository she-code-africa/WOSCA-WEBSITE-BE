import joi from 'joi';

export const submitPRValidation = joi.object({
  pr_link: joi.string().uri().required(),
});
