import { IhsCollection } from "../db/models/ihsdata";


export const getIhs = async (query = {}) => {
  return await IhsCollection.find(query);
};
