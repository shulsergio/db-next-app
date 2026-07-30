import { PopsCollection } from '../db/models/pops.js';
import { ShopPopStatusesCollection } from '../db/models/shopPopsStatus.js';

// ------------

export const getShopPopsController = async (req, res, next) => {
  try {
    const { shopId } = req.params;

    const allPops = await PopsCollection.find({ isActive: true }).lean();

    const existingStatuses = await ShopPopStatusesCollection.find({
      shopId,
    }).lean();

    const statusMap = new Map(
      existingStatuses.map((item) => [item.popId.toString(), item]),
    );

    // 3. Формируем единый массив для фронтенда
    const result = allPops.map((pop) => {
      const statusRecord = statusMap.get(pop._id.toString());
      return {
        popId: pop._id,
        popCode: pop.popCode,
        name: pop.name,
        dep: pop.dep,
        group: pop.group,
        description: pop.description,
        isPlaced: statusRecord ? statusRecord.isPlaced : false,
        updatedAt: statusRecord ? statusRecord.updatedAt : null,
      };
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved shop POP statuses',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ------------

// ------------

export const updateShopPopsController = async (req, res, next) => {
  try {
    const { shopId } = req.params;
    const { statuses } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(statuses) || statuses.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: statuses array is required.',
      });
    }

    // Собираем операции для массового обновления в 1 запрос к MongoDB
    const operations = statuses.map((item) => ({
      updateOne: {
        filter: { shopId, popId: item.popId },
        update: {
          $set: {
            isPlaced: item.isPlaced,
            updatedBy: userId,
          },
        },
        upsert: true,
      },
    }));

    await ShopPopStatusesCollection.bulkWrite(operations);

    res.status(200).json({
      status: 200,
      message: 'POP statuses updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
