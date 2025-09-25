import { getFocusModels } from '../services/focusModels.js';

export const getFocusModelsController = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { page, limit, selectedPrd, isFocusOnly, isBonusOnly } = req.query;
    if (!type) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request dep.',
      });
    }
    const editType = type === 'AV' ? 'AV' : 'DA';
    const curPage = parseInt(page, 10) || 1;
    const size = parseInt(limit, 10) || 20;
    console.log(
      '!!!getFocusModelsController - isFocusOnly value:',
      isFocusOnly,
      'type:',
      typeof isFocusOnly,
    );
    console.log('!!!getFocusModelsController - type:', type);
    console.log('!!!getFocusModelsController - editType:', editType);
    console.log('!!!getFocusModelsController - page:', curPage);
    console.log('!!!getFocusModelsController - size:', size);
    const { data, totalCount } = await getFocusModels(
      editType,
      size,
      curPage,
      selectedPrd,
      isFocusOnly === 'true' ? 1 : 0,
      isBonusOnly === 'true' ? 1 : 0,
    );
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
