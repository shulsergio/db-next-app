import { IhsCollection } from "../db/models/ihsdata.js";
// import { PlansCollection } from "../db/models/plans.js";

export const getIhs = async ({ storeId }) => {
    // console.log('***** CONSOLE getIhs - storeId:', storeId);
 return await IhsCollection.find({storeId});
  // return await PlansCollection.find({}).limit(3);
};
