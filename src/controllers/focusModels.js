import { getFocusModels } from '../services/focusModels';

export const getFocusModelsController = async (req, res, next) => {
  try {
    const id = req.query.dep;
    console.log('!!!getFocusModelsController - id:', id);
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request dep.',
      });
    }
    const data = await getFocusModels({ id: id });
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved ihs!',
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
