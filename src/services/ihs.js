import { IhsCollection } from "../db/models/ihsdata.js";


export const getIhs = async ({ shopId }) => {
return await IhsCollection.find({ "ihsData.storeId": shopId });
};
