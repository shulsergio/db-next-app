import ACCESS_MAP from '../constants/access.js';

const requirePermission = (requiredPermission) => (req, res, next) => {
  const userRole = req.user.role;

  const permissions = ACCESS_MAP[userRole];

  if (!permissions || permissions[requiredPermission] !== true) {
    return res.status(403).json({
      message: 'Insufficient permissions for this action.',
    });
  }
  next();
};

export default requirePermission;
