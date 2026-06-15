import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (
  editType,
  limit,
  curPage,
  selectedPrd,
  selectedMonth,
  isFocusOnly,
  isBonusOnly,
  search,
) => {
  try {
    const skipModels = (curPage - 1) * limit;
    const type = editType;
    const prdToFilter = selectedPrd || 'all';
    const monthToFilter = selectedMonth || 'no';
    const filter = { type };
    // filter.year = 2025;

    Number(isFocusOnly) === 1 ? (filter.focus = { $gt: 0 }) : null;
    Number(isBonusOnly) === 1 ? (filter.topFocus = { $gt: 0 }) : null;

    if (prdToFilter !== 'all') {
      filter.prd = prdToFilter;
    }
    if (monthToFilter !== 'no') {
      filter.month = monthToFilter;
    }
    if (search && search.trim() !== '') {
      filter.sku = { $regex: search.trim(), $options: 'i' };
    }

    console.log(
      '=== Итоговый фильтр в БД ===',
      JSON.stringify(filter, null, 2),
    );

    const totalCount = await focusModelsCollection.countDocuments(filter);
    console.log('=== totalCount from Collection ===', totalCount);
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
