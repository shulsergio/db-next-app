import { AVdavMotivationCollection } from '../db/models/davMotivation.js';

export const getDavMotivationController = async (req, res, next) => {
  const { cluster } = req.query;
  try {
    const davMotivations = await AVdavMotivationCollection.find({ cluster });
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved DAV motivations!',
      data: { davMotivations },
    });
  } catch (error) {
    console.error('Error in getDavMotivationController:', error);
    next(error);
  }
};
