// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async ({ _id }) => {
  // console.log('***** CONSOLE getIhs - storeId:', storeId);
  return await focusModelsCollection.find({ _id });
};
