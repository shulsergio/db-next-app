import { getIhs } from "../services/ihs";


export const getIhsController = async (req, res, next) => {
  try {
    const ihs = await getIhs({ userId: req.user._id });

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
