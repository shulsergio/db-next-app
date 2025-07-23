import { getIhs } from "../services/ihs.js";


export const getIhsController = async (req, res, next) => {
  try {
    const storeId = req.query.storeId;
// console.log('***** CONSOLE - getIhsController - shopId:', storeId);
       if (!storeId) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: shopId is required.',
      });
    }


    const data = await getIhs({ storeId: storeId });
// console.log('***** CONSOLE - getIhsController - data:', data);
// console.log('***** CONSOLE - getIhsController - {data}:', {data});
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved ihs!',
      data: {
        data,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};
