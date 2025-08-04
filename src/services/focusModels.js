// import { PlansCollection } from "../db/models/plans.js";

export const getFocusModels = async ({ storeId }) => {
  // console.log('***** CONSOLE getIhs - storeId:', storeId);
  return await focusModelsCollection.find({ storeId });
  // return await PlansCollection.find({}).limit(3);
};
