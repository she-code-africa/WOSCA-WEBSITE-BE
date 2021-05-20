import _ from 'lodash';
import User from '../../../data/user/user.schema';
import { errorResponse, successResponse } from '../../utils/responsehandler';
import { sign } from '../../utils/jwt';

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
