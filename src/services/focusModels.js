import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (
  editType,
  limit,
  curPage,
  selectedPrd,
  isFocusOnly,
  isBonusOnly,
) => {
  try {
    const skipModels = (curPage - 1) * limit;
    const type = editType;
    const prdToFilter = selectedPrd || 'all';
    const filter = { type };
    filter.year = 2025;
    filter.month = 9;

    Number(isFocusOnly) === 1 ? (filter.focus = { $gt: 0 }) : null;
    Number(isBonusOnly) === 1 ? (filter.topFocus = { $gt: 0 }) : null;

    if (prdToFilter !== 'all') {
      filter.prd = prdToFilter;
    }
    const totalCount = await focusModelsCollection.countDocuments(filter);
    const data = await focusModelsCollection
      .find(filter)
      .skip(skipModels)
      .limit(limit)
      .lean();
    return { data, totalCount };
  } catch (error) {
    console.log(error);
  }
};
