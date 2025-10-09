import createHttpError from 'http-errors';
import { getUserById } from '../services/admin.js';
import { patchPassword } from '../services/auth.js';

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
      return next(createHttpError(403, 'Forbidden'));
    }

    const user = await getUserById(id);

    if (!user) {
      return next(createHttpError(404, 'User not found.'));
    }

    res.status(200).json({
      status: 200,
      message: 'ok!',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          mcsId: user.mcsId,
          role: user.role,
          userType: user.userType,
          gender: user.gender,
          uniform: user.uniform,
          region: user.region,
          city: user.city,
          INN: user.INN,
          mobile: user.mobile,
          dateOfHired: user.DateOfHired,
          dateOfFired: user.DateOfFired,
          shop: user.shop,
          lastVisit: user.lastVisit,
        },
      },
    });
  } catch (error) {
    console.error('Error in getUserByIdController:', error);
    next(createHttpError(500, 'Failed to retrieve user data.'));
  }
};

export const patchPasswordController = async (req, res, next) => {
  const user = req.user;
  const body = req.body;
  const data = await patchPassword(user, body);

  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data,
  });
};
