import { PopsCollection } from '../db/models/pops.js';
import { MerchPopInventoryCollection } from '../db/models/merchPopInventory.js';

import ExcelJS from 'exceljs';

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

export const exportMerchInventoryController = async (req, res, next) => {
  try {
    // 1. Получаем остатки мерчей и разворачиваем связи
    const inventory = await MerchPopInventoryCollection.find()
      .populate('userId', 'name email mcsId city region')
      .populate('popId', 'popCode name group dep type')
      .lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Инвентаризация POP');

    worksheet.columns = [
      { header: 'Merch Name', key: 'merchName', width: 25 },
      { header: 'MCS ID', key: 'mcsId', width: 15 },
      { header: 'City', key: 'city', width: 18 },
      { header: 'Region', key: 'region', width: 15 },
      { header: 'POP ID', key: 'popCode', width: 18 },
      { header: 'POP name', key: 'popName', width: 30 },
      { header: 'POP type', key: 'popType', width: 15 },
      { header: 'Group', key: 'group', width: 12 },
      { header: 'DEP', key: 'dep', width: 12 },
      { header: 'Qty Stock', key: 'qtyStock', width: 15 },
      { header: 'Date', key: 'updatedAt', width: 20 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE2E8F0' },
    };

    inventory.forEach((item) => {
      worksheet.addRow({
        merchName: item.userId?.name || 'Удаленный пользователь',
        mcsId: item.userId?.mcsId || '-',
        city: item.userId?.city || '-',
        region: item.userId?.region || '-',
        popCode: item.popId?.popCode || '-',
        popName: item.popId?.name || 'Удаленный POP',
        popType: item.popId?.type || '-',
        group: item.popId?.group || '-',
        dep: item.popId?.dep || '-',
        qtyStock: item.qtyStock || 0,
        updatedAt: item.updatedAt
          ? new Date(item.updatedAt).toLocaleString('ru-RU')
          : '-',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=merch_pop_inventory_report.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Inventory Export Error:', error);
    next(error);
  }
};
