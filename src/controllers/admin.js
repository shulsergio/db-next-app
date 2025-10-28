// import createHttpError from 'http-errors';
import {
  getAllPlans,
  getAllPromoters,
  getPromoters,
} from '../services/admin.js';
// import { getPlans } from '../services/plans.js';

export const getAllPlansController = async (req, res, next) => {
  try {
    // if (!req.user || req.user.permissions !== 'admin') {
    //   return next(createHttpError(403, 'Only for admin.'));
    // }
    console.log('***!!!getAllPlansController req.user:', req.user);
    const plans = await getAllPlans();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllPromotersController = async (req, res, next) => {
  try {
    // if (!req.user || req.user.role !== 'admin') {
    //   return next(createHttpError(403, 'Only for admin.'));
    // }
    const users = await getAllPromoters();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    console.log('getAllUsersController: End');
  }
};

export const getPromotersController = async (req, res, next) => {
  try {
    const { userType, region } = req.query;
    const users = await getPromoters(userType, region);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    console.log('getAllUsersController: End');
  }
};
