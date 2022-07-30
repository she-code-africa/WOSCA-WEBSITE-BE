import { get } from '../../common/config/redis';
import { decode } from '../utils/jwt';
import { errorResponse } from '../utils/responsehandler';

export default async function AuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return errorResponse(res, 'Missing Authorization header in request', 401, req);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return errorResponse(res, 'No token provided in Authorization Header', 401, req);
  }

  const tokenData = await decode(token);
  // Check if the password has be reset since the last time a token was generated
  const lastPasswordChange = await get(
    `last-password-reset:${tokenData.id}`,
  );
  if (Number(lastPasswordChange) > tokenData.iat) {
    return errorResponse(res, 'Invalid token sent in Authorization header', 401, req);
  }

  req.user = tokenData;
  return next();
}
