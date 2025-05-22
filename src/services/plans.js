import { PlansCollection } from '../db/models/plans.js';

export const getPlans = async (query = {}) => {
  return await PlansCollection.find(query);
};
