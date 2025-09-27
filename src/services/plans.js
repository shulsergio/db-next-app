import { PlansCollection } from '../db/models/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};

export const getListOfTopBonusesByStore = async (storeId, type, week) => {
  console.log('XXXgetListOfTopBonusesByStoreService - storeId:', storeId);
  console.log('XXXgetListOfTopBonusesByStoreService - type:', type);
  console.log('XXXgetListOfTopBonusesByStoreService - week:', week);

  try {
    const cleanedStoreId = storeId.trim();
    const filter = {
      storeId: cleanedStoreId,
    };

    if (type === 'DA') {
      filter.prd = { $in: ['SDA', 'MDA'] };
    } else if (type === 'AV' || type === 'SDA' || type === 'MDA') {
      filter.prd = type;
    }
    if (week !== 'all') {
      filter.week = week;
    }
    console.log('XXXgetListOfTopBonusesByStoreService - filter:', filter);

    const result = await topBonusesCollection.find(filter).exec();

    console.log('[Service] result:', result);
    return result;
  } catch (error) {
    console.error('[Service]:', error);
    throw error;
  }
};

// .sort({ bonus: -1 }).limit(10);
