import { getShops } from '../services/shops';

export const getShopsController = async (req, res, next) => {
  try {
    const plans = await getShops({ userId: req.user._id });

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
