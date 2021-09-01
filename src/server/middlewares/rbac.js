import { errorResponse } from '../utils/responsehandler';

/**
 * Middleware to determin user role
 * @param roles The list of roles to authenticate the user agaisnt.
 */
export default (roles) => (req, res, next) => {
  try {
    if (!req.user.id || !roles.includes(req.user.role)) { throw new Error('You are not authorized to perform this action'); }

    return next();
  } catch (err) {
    return errorResponse(res, req, 401, { message: 'You are not authorized to perform this action' });
  }
};
