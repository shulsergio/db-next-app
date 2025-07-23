import { NewdataCollection } from '../db/models/newdata.js';

export const getNewdata = async () => {
  return await NewdataCollection.find({}).limit(5);
};
