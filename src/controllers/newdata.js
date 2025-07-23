import { getNewdata } from '../services/newdata.js';

export const getNewdataController = async (req, res, next) => {
  try {
    // const plans = await getData({ userId: req.user._id });
const newdata = await getNewdata({});
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved data!',
      data: {
        newdata,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};