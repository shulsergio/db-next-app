import { PlansCollection } from '../db/models/plans.js';

export const getAllPlans = async () => {
  return await PlansCollection.find();
};
