import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getListOfTopBonusesByStore = async (storeId) => {
  try {
    const result = await topBonusesCollection.findOne({ storeId: storeId });

    console.error('[Service] result:', result);
    return result;
  } catch (error) {
    console.error('[Service]:', error);
    throw error;
  }
};

// .sort({ bonus: -1 }).limit(10);
