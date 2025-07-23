import { IhsCollection } from "../db/models/ihsdata";


export const getIhs = async ({ shopId }) => {
  return await IhsCollection.find({ storeId: shopId });
};
