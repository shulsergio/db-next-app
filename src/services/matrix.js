import { MatrixCollection } from "../db/models/matrixdata";


export const getMatrix = async ({ storeId }) => {
    return await MatrixCollection.find({storeId});
};
