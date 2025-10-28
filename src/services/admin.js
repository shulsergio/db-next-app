import { PlansCollection } from '../db/models/plans.js';
import { UsersCollection } from '../db/models/users.js';

export const getAllPlans = async () => {
  return await PlansCollection.find().lean();
};
// ---------
export const getAllPromoters = async () => {
  const users = await UsersCollection.find({ role: 'promoter' }).lean();
  return users;
};

export const getPromoters = async (userType, region) => {
  const users = await UsersCollection.find({
    role: 'promoter',
    userType: userType,
    region: region,
  }).lean();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId).lean();
  return user;
};
