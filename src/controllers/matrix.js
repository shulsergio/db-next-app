
import { getMatrix } from "../services/matrix.js";


export const getMatrixController = async (req, res, next) => {
  try {
    const storeId = req.query.storeId;
       if (!storeId) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: shopId is required.',
      });
    }
    const data = await getMatrix({ storeId: storeId });
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved matrix!',
      data: {
        data,
      },
    });
  } catch (error) {
    console.error('Error in getMatrixController:', error);
    next(error);
  }
};
