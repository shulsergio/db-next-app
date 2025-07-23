import { IhsCollection } from "../db/models/ihsdata.js";


export const getIhs = async ({ storeId }) => {
    console.log('***** CONSOLE getIhs - storeId:', storeId);
 return await IhsCollection.find({}).limit(5);
};
