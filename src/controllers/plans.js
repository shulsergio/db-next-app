import { getPlans } from '../services/plans.js';

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
