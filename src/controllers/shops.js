import { getAllShops, getShopById } from '../services/shops.js';

export const getShopByIdController = async (req, res, next) => {
  const { storeId } = req.params;

  try {
    const shops = await getShopById({ storeId: storeId });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved shops!',
      data: {
        shops,
      },
    });
  } catch (error) {
    console.error('Error in getAllShopsController:', error);
    next(error);
  }
};

export const getAllShopsController = async (req, res, next) => {
  // const { storeId } = req.params;

  try {
    const shops = await getAllShops();

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved shops!',
      data: {
        shops,
      },
    });
  } catch (error) {
    console.error('Error in getAllShopsController:', error);
    next(error);
  }
};
