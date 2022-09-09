import jwt from 'jsonwebtoken';
import env from '../../common/config/env';

/**
 * Signs a payload and returns a promise that resolves to the signed payload as a token.
 * @param payload
 */
/**
  * @param payload
  */

export const sign = (payload) => {
  try {
    const token = jwt.sign({ ...payload, iat: Date.now() }, env.jwt_secret, {
      expiresIn: env.passwordExpiresIn,
    });
    return token;
  } catch (err) {
    return err;
  }
};

export const decode = (token) => {
  try {
    const decoded = jwt.verify(token, env.jwt_secret);
    return decoded;
  } catch (err) {
    return err;
  }
};
