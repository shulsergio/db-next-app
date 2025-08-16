import { ShopsCollection } from '../db/models/shops.js';

export const getAllShops = async (query = {}) => {
  return await ShopsCollection.find(query);
};

export const getShopById = async ({ storeId }) => {
  return await ShopsCollection.findOne({ storeId });
};
