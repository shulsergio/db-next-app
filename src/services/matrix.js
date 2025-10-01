import { MatrixCollection } from '../db/models/matrixdata.js';

export const getMatrix = async ({ storeId }) => {
  return await MatrixCollection.find({ storeId }).lean();
};
