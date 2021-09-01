import jwt from 'jsonwebtoken';
import env from '../../common/config/env';

/**
 * Signs a payload and returns a promise that resolves to the signed payload as a token.
 * @param payload
 */

export const sign = (payload) => new Promise((resolve, reject) => {
  jwt.sign(
    { ...payload, iat: Date.now() },
    env.jwt_secret,
    { expiresIn: '30 days' },
    (err, token) => {
      if (err) reject(err);
      resolve(token);
    },
  );
});

/**
 * Decodes a JWT Token and returns the  payload
 * @param token
 */

export const decode = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, env.jwt_secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});
