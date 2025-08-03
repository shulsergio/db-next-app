import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getListOfTopBonusesByStore = async (storeId) => {
    try {
        console.log(`[Service Debug] Attempting to find storeId: '${storeId}' in field 'bonusData.storeId'`);
        
        const result = await topBonusesCollection.findOne({ 'bonusData.storeId': storeId });

        console.log('[Service Debug] Mongoose query result:', result);

        if (!result) {
            console.warn('[Service Debug] No document found for the given storeId.');
        }

        return result;
    } catch (error) {
        console.error('[Service Error] Error while querying database:', error);
        throw error;
    }
};

// .sort({ bonus: -1 }).limit(10);