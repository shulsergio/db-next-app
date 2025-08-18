// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (dep) => {
  console.log('**???*** CONSOLE getFocusModels - type:', dep);
  return await focusModelsCollection.find({ dep });
};
