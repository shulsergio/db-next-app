import { ShopsCollection } from '../db/models/shops';

export const getShops = async (query = {}) => {
  return await ShopsCollection.find(query);
};
