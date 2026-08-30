import { ShopPopStatusesCollection } from '../db/models/shopPopsStatus.js';
import { ShopsCollection } from '../db/models/shops.js';
import { getAllShops } from '../services/shops.js';

// ---------------

export const getMerchShopsController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const shops = await getAllShops({ merchandiserId: userId });

    res.status(200).json({
      status: 200,
      message: 'Successfully merchandiser shops',
      data: shops,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------
//  ANALYZE
// ---------------

export const getPopMetricsController = async (req, res, next) => {
  try {
    // 1. Агрегация по статусам POP
    const statusStats = await ShopPopStatusesCollection.aggregate([
      {
        $group: {
          _id: null,
          totalPlaced: { $sum: '$qtyPlaced' },
          totalRequired: { $sum: '$qtyTotal' }, 
          uniqueShops: { $addToSet: '$shopId' }, 
          outOfStockCount: {
            $sum: {
              $cond: [{ $lt: ['$qtyPlaced', '$qtyTotal'] }, 1, 0],
            },
          },
        },
      },
    ]);

    // 2. Общее количество всех магазинов в базе
    const totalShopsCount = await ShopsCollection.countDocuments();

    // Елаем фоллбэки на случай, если база статусов пока пустая
    const stats = statusStats[0] || {
      totalPlaced: 0,
      totalRequired: 0,
      uniqueShops: [],
      outOfStockCount: 0,
    };

    const totalPlaced = stats.totalPlaced;
    const totalRequired = stats.totalRequired;

    // % Реализации плана
    const completionRate =
      totalRequired > 0
        ? Number(((totalPlaced / totalRequired) * 100).toFixed(1))
        : 0;

    // Покрытие магазинов
    const activeShopsCount = stats.uniqueShops.length;
    const coverageRate =
      totalShopsCount > 0
        ? Number(((activeShopsCount / totalShopsCount) * 100).toFixed(1))
        : 0;

    res.status(200).json({
      status: 200,
      data: {
        completionRate,  
        totalPlaced,
        totalRequired,
        activeShopsCount,
        totalShopsCount,
        coverageRate,  
        outOfStockCount: stats.outOfStockCount, 
      },
    });
  } catch (error) {
    next(error);
  }
};