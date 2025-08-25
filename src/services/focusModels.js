// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (editType, limit, curPage, selectedPrd) => {
  try {
    const skipModels = (curPage - 1) * limit;
    console.log('**???*** CONSOLE getFocusModels - limit:', limit);
    console.log('**???*** CONSOLE getFocusModels - page:', curPage);
    console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
    console.log('**???*** CONSOLE getFocusModels - selectedPrd:', selectedPrd);

    const filter = { editType };

    if (selectedPrd && selectedPrd !== 'all') {
      filter.prd = selectedPrd;
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
