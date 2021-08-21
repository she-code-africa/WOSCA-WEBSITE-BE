import env from '../../common/config/env';

/**
 * Get email link based on user role
 * @param role user role
 * @param id user Id
 * @param hash unique URL hash
 */

export const getLink = async (id, hash) => {
  const link = `${env.protocol}://${env.domain}/#/reset-password?id=${id}&hash=${hash}`;
  return link;
};
