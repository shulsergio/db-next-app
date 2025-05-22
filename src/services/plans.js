import { PlansCollection } from '../db/models/plans.js';

export const getPlans = async () => {
  return await PlansCollection.find({});
};
