import joi from 'joi';

export function createEventValidation(data) {
  const schema = joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    event_link: joi.string(),
    startTime: joi.date().required(),
    endTime: joi.date().required(),
    description: joi.string().required(),
  });
  return schema.validate(data);
}

export function createProgramValidation(data) {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
  });
  return schema.validate(data);
}
export function submitPRValidation(data) {
  const schema = joi.object({
    pr_link: joi.string().uri().required(),
  });
  return schema.validate(data);
}

export function createUserValidation(data) {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string(),
  });
  return schema.validate(data);
}
export function userLoginValidation(data) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return schema.validate(data);
}

export function passwordResetRequest(data) {
  const schema = joi.object({
    email: joi.string().email().required(),
  });
  return schema.validate(data);
}
