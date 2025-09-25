// import { PlansCollection } from "../db/models/plans.js";

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
    console.log(
      '**???*** CONSOLE getFocusModels - isFocusOnly value:',
      isFocusOnly,
      'type:',
      typeof isFocusOnly,
    );
    const skipModels = (curPage - 1) * limit;
    const type = editType;
    console.log('**???*** CONSOLE getFocusModels - editType:', type);
    console.log('**???*** CONSOLE getFocusModels - limit:', limit);
    console.log('**???*** CONSOLE getFocusModels - page:', curPage);
    console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
    console.log('**???*** CONSOLE getFocusModels - selectedPrd:', selectedPrd);

    const prdToFilter = selectedPrd || 'all';
    const filter = { type };
    filter.year = 2025;
    filter.month = 9;
    Number(isFocusOnly) === 1 ? (filter.focus = { $gt: 0 }) : null;
    Number(isFocusOnly) === 1 ? (filter.topFocus = { $gt: 0 }) : null;
    console.log(
      '**???*** CONSOLE getFocusModels - filter.focus:',
      filter.focus,
    );
    if (prdToFilter !== 'all') {
      filter.prd = prdToFilter;
    }
    console.log('**???*** CONSOLE getFocusModels - prdToFilter:', prdToFilter);
    console.log('**???*** CONSOLE getFocusModels - filter:', filter);

    const totalCount = await focusModelsCollection.countDocuments(filter);
    const data = await focusModelsCollection
      .find(filter)
      .skip(skipModels)
      .limit(limit)
      .exec();
    console.log('**???*** CONSOLE getFocusModels - totalCount:', totalCount);
    console.log('**???*** CONSOLE getFocusModels - data:', data);
    return { data, totalCount };
  } catch (error) {
    console.log(error);
  }
};
