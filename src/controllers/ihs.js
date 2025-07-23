import { getIhs } from "../services/ihs.js";


export const getIhsController = async (req, res, next) => {
  try {
    const shopId = req.query.shopId;
console.log('***** CONSOLE - getIhsController - shopId:', shopId);
       if (!shopId) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: shopId is required.',
      });
    }


    const ihs = await getIhs({ shopId: shopId });

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
