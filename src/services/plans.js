import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getListOfTopBonusesByStore = async (storeId, userType) => {
console.error('[Service] userType:', userType);
const targetPrds= userType==='DA'? ['SDA','MDA'] : [userType];

console.error('[Service] targetPrds:', targetPrds);
    try {
const result = await topBonusesCollection.find({ 
  storeId:storeId,
  'categories.prd': { $in: targetPrds }
});

console.error('[Service] result:', result);
        return result;

    } catch (error) {
        console.error('[Service]:', error);
        throw error;
    }
};

// .sort({ bonus: -1 }).limit(10);