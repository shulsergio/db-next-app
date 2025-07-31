import { PlansCollection } from '../db/models/plans.js';
import { UsersCollection } from '../db/models/users.js';

export const getAllPlans = async () => {
  return await PlansCollection.find().lean();
};
// ---------
export const getAllUsers = async () => {
  const users = await UsersCollection.find({ role: 'promoter' }).lean();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId).lean();
  return user;
};
