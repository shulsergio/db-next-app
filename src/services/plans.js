import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getListOfTopBonusesByStore = async (storeId) => {
    try {
        console.log(`[Service Debug] Attempting to find storeId: '${storeId}'`);
        
        const allDocuments = await topBonusesCollection.find({});
        console.log('[Service Debug] All documents in the collection:', allDocuments);
        
        const result = await topBonusesCollection.findOne({ storeId });
        console.log('[Service Debug] Mongoose query result:', result);

        if (!result) {
            console.warn('[Service Debug] No document found for the given storeId. Please check the `allDocuments` log to verify if the storeId exists and is spelled correctly.');
        }

        return result;
    } catch (error) {
        console.error('[Service Error] Error while querying database:', error);
        throw error;
    }
};



// .sort({ bonus: -1 }).limit(10);