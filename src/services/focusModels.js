// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (type, limit, curPage, selectedPrd) => {
  try {
    const skipModels = (curPage - 1) * limit;
    console.log('**???*** CONSOLE getFocusModels - limit:', limit);
    console.log('**???*** CONSOLE getFocusModels - page:', curPage);
    console.log('**???*** CONSOLE getFocusModels - skipModels:', skipModels);
    console.log('**???*** CONSOLE getFocusModels - selectedPrd:', selectedPrd);

    const filter = { type };

    if (selectedPrd && selectedPrd !== 'all') {
      filter.prd = selectedPrd;
    }
    const totalCount = await focusModelsCollection.countDocuments(filter);
    const data = await focusModelsCollection
      .find({ type, prd: selectedPrd })
      .skip(skipModels)
      .limit(limit)
      .exec();
    return { data, totalCount };
  } catch (error) {
    console.log(error);
  }
};
