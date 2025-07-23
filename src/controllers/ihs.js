import { getIhs } from "../services/ihs.js";


export const getIhsController = async (req, res, next) => {
  try {
    const storeId = req.query.shopId;
console.log('***** CONSOLE - getIhsController - shopId:', storeId);
       if (!storeId) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: shopId is required.',
      });
    }


    const ihs = await getIhs({ storeId: storeId });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved ihs!',
      data: {
        ihs,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};
