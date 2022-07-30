import crypto from 'crypto';
import User from '../../schema/user.schema';
import { errorResponse, successResponse } from '../utils/responsehandler';
import { sign } from '../utils/jwt';
import { getLink } from '../utils/misc';
import { templates } from '../../common/services/email/templates';
import { sendMailGeneric } from '../../common/services/email/handler';
import { set, get } from '../../common/config/redis';
import { createUserValidation, passwordResetRequest, userLoginValidation } from '../utils/validation';

export const createUser = async (req, res) => {
  try {
    const { body } = req;
    const { email } = body;
    const { error } = createUserValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400, req);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'Email already exist', 409, req);
    }
    const user = await User.create({ ...body });
    const token = await sign({ id: user.id, role: user.role });
    return successResponse(res, 201, 'You have successfully created an account', { user, token }, req);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
export const signin = async (req, res) => {
  try {
    const { body } = req;
    const { error } = userLoginValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400, req);

    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 'User does not  exist', 404, req);
    }
    await user.validatePassword(password);
    const token = await sign({ id: user._id, role: user.role });
    return successResponse(res, 200, 'You have successfully logged in', { user, token }, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { body } = req;
    const { email } = body;
    const { error } = passwordResetRequest(body);
    if (error) return errorResponse(res, error.details[0].message, 400, req);

    const user = await User.findOne({ email });
    const hash = crypto.randomBytes(32).toString('hex');
    // Store hash in Redis for 1 hour.
    await set(`password-reset:${user.id}`, hash, 'EX', 3600);

    const link = await getLink(user.id, hash);
    const payload = {
      dynamic_template_data: { link },
      to: user.email,
      templateId: templates.passwordResetRequest.templateId,
      title: templates.passwordResetRequest.title,
    };
    sendMailGeneric(payload);
    return successResponse(res, 200, 'Password reset link sent', req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const resetPasswordConfirmation = async (req, res) => {
  try {
    const { body: { id, hash, password } } = req;
    const hashKey = `password-reset:${id}`;

    // Check if the hash is valid and stored.
    const hashedKey = await get(hashKey);
    if (hashedKey !== hash) throw new Error('Invalid password reset link.');

    const user = await User.findOne({ _id: id });
    await user.updatePassword(password);
    await user.save();

    // Update the last password change cache
    await set(`last-password-reset:${user.id}`, Date.now());
    const payload = {
      dynamic_template_data: {},
      to: user.email,
      templateId: templates.passwordResetConfirmation.templateId,
      title: templates.passwordResetConfirmation.title,
    };
    sendMailGeneric(payload);
    return successResponse(res, 200, 'Successfully reset password', req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
