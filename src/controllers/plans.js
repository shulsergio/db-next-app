import createHttpError from 'http-errors';
import { getPlans, getTopBonusesByStore } from '../services/plans.js';

export const getPlansController = async (req, res, next) => {
  try {
    const plans = await getPlans({ userId: req.user._id });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved plans!',
      data: {
        plans,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};

export const getTopBonusesByStoreController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bonuses = await getTopBonusesByStore(id);

    if (!bonuses) {
      return next(createHttpError(404, 'Bonuses not found for this store.'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved bonuses!',
      data: {
        bonuses,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};