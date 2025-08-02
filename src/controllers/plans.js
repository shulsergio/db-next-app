// import createHttpError from 'http-errors';
import { getPlans,  } from '../services/plans.js';
import { topBonusesCollection } from '../db/models/topBonuses.js';

export const getPlansController = async (req, res, next) => {
  try {
    const plans = await getPlans({ userId: req.user._id });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved plans!',
      data: {
        plans,
      },
    });
  } catch (error) {
    console.error('Error in getPlansController:', error);
    next(error);
  }
};

export const getTopBonusesByStoreController = async (req, res, next) => {
  const { storeId } = req.params;

  console.log(`[Controller Debug] Fetching bonuses for store ID: ${storeId}`);
  console.log(`[Controller Debug] storeId from params: "${storeId}"`); // <-- Проверяем, что storeId правильный

  const query = { '_id.mcsId': storeId };
  console.log('[Controller Debug] Mongoose query object:', JSON.stringify(query, null, 2)); // <-- Выводим, что именно ищем

  try {
    const result = await topBonusesCollection.findOne(query);

    // Логируем результат, независимо от того, найден он или нет
    if (result) {
      console.log('[Controller Debug] Mongoose query result: Document found!');
    } else {
      console.log('[Controller Debug] Mongoose query result: null');
    }

    if (!result) {
      const err = 'Bonuses not found for this store.';
      return next(err);
    }

    res.status(200).json(result);

  } catch (error) {
    console.error('[Controller Debug] An error occurred during the Mongoose query:', error);
    return next(error);
  }
};