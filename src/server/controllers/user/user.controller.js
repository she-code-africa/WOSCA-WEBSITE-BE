// import _ from 'lodash';
import crypto from 'crypto';
import User from '../../../data/user/user.schema';
import { errorResponse, successResponse } from '../../utils/responsehandler';
import { sign } from '../../utils/jwt';
import { getLink } from '../../utils/misc';
import { templates } from '../../../common/services/email/templates';
import { sendMailGeneric } from '../../../common/services/email/handler';
import { set, get } from '../../../common/config/redis';

export const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, req, 409, { message: 'User already exist' });
    }
    const user = await User.create({ ...body });
    const token = await sign({ id: user.id, role: user.role });
    return successResponse(res, req, 201, { message: 'You have successfully created an account', token, user });
  } catch (error) {
    return next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, req, 404, { message: 'User does not exist' });
    }
    await user.validatePassword(password);
    const token = await sign({ id: user._id, role: user.role });
    return successResponse(res, req, 200, { message: 'You have successfully logged in', token, user });
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
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
    return successResponse(res, req, 200, { message: 'Password reset link sent' });
  } catch (error) {
    return next(error);
  }
};

export const resetPasswordConfirmation = async (req, res, next) => {
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
    return successResponse(res, req, 200, { message: 'Successfully reset password' });
  } catch (error) {
    return next(error);
  }
};
