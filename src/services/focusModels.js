// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (editType, limit, curPage, selectedPrd) => {
  try {
    const skipModels = (curPage - 1) * limit;
    const type = editType;
    console.log('**???*** CONSOLE getFocusModels - editType:', type);
    console.log('**???*** CONSOLE getFocusModels - limit:', limit);
    console.log('**???*** CONSOLE getFocusModels - page:', curPage);
    console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
    console.log('**???*** CONSOLE getFocusModels - selectedPrd:', selectedPrd);

    const prdToFilter = selectedPrd || 'all';
    const filter = { type };
    if (prdToFilter !== 'all') {
      filter.prd = prdToFilter;
    }
    const totalCount = await focusModelsCollection.countDocuments(filter);
    const data = await focusModelsCollection
      .find(filter)
      .skip(skipModels)
      .limit(limit)
      .exec();
    return { data, totalCount };
  } catch (error) {
    console.log(error);
  }
};
