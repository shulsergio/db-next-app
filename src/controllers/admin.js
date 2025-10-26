// import createHttpError from 'http-errors';
import { getAllPlans, getAllUsers } from '../services/admin.js';
// import { getPlans } from '../services/plans.js';

export const getAllPlansController = async (req, res, next) => {
  try {
    // if (!req.user || req.user.permissions !== 'admin') {
    //   return next(createHttpError(403, 'Only for admin.'));
    // }
    const plans = await getAllPlans();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    // if (!req.user || req.user.role !== 'admin') {
    //   return next(createHttpError(403, 'Only for admin.'));
    // }
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    console.log('getAllUsersController: End');
  }
};
