import { davMotivationCollection } from '../db/models/davMotivation';

export const getDavMotivationController = async (req, res, next) => {
  try {
    const davMotivations = await davMotivationCollection.find({});
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
