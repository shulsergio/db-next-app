import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getTopBonusesByStore = async (storeId) => {

        return await topBonusesCollection.findOne({ '_id.mcsId': storeId });
      
}; 

// .sort({ bonus: -1 }).limit(10);