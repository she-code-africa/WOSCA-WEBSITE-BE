/**
 * Middleware to determin user role
 * @param roles The list of roles to authenticate the user agaisnt.
 */
const rbac = (roles) => (req, res, next) => (roles.length > 0 && !roles.includes(req.user.role)
  ? res
    .status(401)
    .json({ message: 'You are not authorized to perform this action' })
  : next());

export default rbac;
