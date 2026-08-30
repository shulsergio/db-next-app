import { PopsCollection } from '../models/pops.js';
import { MerchPopInventoryCollection } from '../models/merchPopInventory.js';

export const getMerchInventoryController = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const allPops = await PopsCollection.find({ isActive: true }).lean();
    const existingStocks = await MerchPopInventoryCollection.find({
      userId,
    }).lean();

    const stockMap = new Map(
      existingStocks.map((item) => [item.popId.toString(), item.qtyStock]),
    );

    const result = allPops.map((pop) => ({
      popId: pop._id,
      popCode: pop.popCode,
      name: pop.name,
      dep: pop.dep,
      group: pop.group,
      type: pop.type || '',
      description: pop.description,
      qtyStock: stockMap.get(pop._id.toString()) || 0,
    }));

    res.status(200).json({ status: 200, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateMerchInventoryController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { items } = req.body; // Ожидаем [{ popId: "...", qtyStock: 15 }, ...]

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: 'Invalid items array' });
    }

    const operations = items.map((item) => ({
      updateOne: {
        filter: { userId, popId: item.popId },
        update: {
          $set: {
            qtyStock: Math.max(0, Number(item.qtyStock) || 0),
          },
        },
        upsert: true,
      },
    }));

    await MerchPopInventoryCollection.bulkWrite(operations);

    res.status(200).json({
      status: 200,
      message: 'Инвентаризация успешно сохранена',
    });
  } catch (error) {
    next(error);
  }
};
