import { get } from '../../common/config/redis';
import { decode } from '../utils/jwt';
import { errorResponse } from '../utils/responsehandler';

export default async function AuthMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return errorResponse(res, req, 401, {
        message: 'Missing Authorization header in request',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return errorResponse(res, req, 401, {
        message: 'No token provided in Authorization Header',
      });
    }

    const tokenData = await decode(token);
    // Check if the password has be reset since the last time a token was generated
    const lastPasswordChange = await get(
      `last-password-reset:${tokenData.id}`,
    );
    if (Number(lastPasswordChange) > tokenData.iat) {
      return errorResponse(res, req, 401, {
        message: 'Invalid token sent in Authorization header',
      });
    }

    req.user = tokenData;
    next();
  } catch (err) {
    return errorResponse(res, req, 401, { message: 'User not authorized' });
  }
}
