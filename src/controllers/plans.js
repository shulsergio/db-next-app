// import createHttpError from 'http-errors';
import { getListOfTopBonusesByStore, getPlans } from '../services/plans.js';

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

export const getListOfTopBonusesByStoreController = async (req, res, next) => {
  const { storeId } = req.params;

  try {
    const bonuses = await getListOfTopBonusesByStore(storeId);

    if (!bonuses) {
      res.status(404).json({
        status: 404,
        message: 'Bonuses not found for this store.',
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved bonuses!',
      data: {
        bonuses,
      },
    });
  } catch (error) {
    console.error('Error in getListOfTopBonusesByStoreController:', error);
    next(error);
  }
};
