import { getAllShops } from '../services/shops';

// ---------------

export const getMerchShopsController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const shops = await getAllShops({ merchandiserId: userId });

    res.status(200).json({
      status: 200,
      message: 'Successfully merchandiser shops',
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};
