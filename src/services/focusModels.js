// import { PlansCollection } from "../db/models/plans.js";

import { focusModelsCollection } from '../db/models/focusModels.js';

export const getFocusModels = async (type) => {
  console.log('**???*** CONSOLE getFocusModels - type:', type);
  return await focusModelsCollection.find({ 'data.type': type }).toArray();
};
