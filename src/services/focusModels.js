// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async ({ type }) => {
  // console.log('***** CONSOLE getIhs - storeId:', storeId);
  return await focusModelsCollection.findOne({ type });
};
