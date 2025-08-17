import { getFocusModels } from '../services/focusModels.js';

export const getFocusModelsController = async (req, res, next) => {
  try {
    const { type } = req.params;
    console.log('!!!getFocusModelsController - type:', type);
    if (!type) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request dep.',
      });
    }
    const data = await getFocusModels({ _id: type });
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved dep!',
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
