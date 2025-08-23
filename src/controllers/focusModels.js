import { getFocusModels } from '../services/focusModels.js';

export const getFocusModelsController = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { curPage, limit } = req.query;
    console.log('!!!getFocusModelsController - type:', type);
    console.log('!!!getFocusModelsController - curPage:', curPage);
    console.log('!!!getFocusModelsController - limit:', limit);
    if (!type) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request dep.',
      });
    }

    const page = parseInt(curPage, 10) || 1;
    const size = parseInt(limit, 10) || 20;
    console.log('!!!getFocusModelsController - type:', type);
    console.log('!!!getFocusModelsController - page:', page);
    console.log('!!!getFocusModelsController - size:', size);
    const { data, totalCount } = await getFocusModels(type, size, page);
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved type!',
      data: {
        data,
        totalCount,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
