import { PopsCollection } from '../db/models/pops.js';
import { ShopPopStatusesCollection } from '../db/models/shopPopsStatus.js';
import ExcelJS from 'exceljs';

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

    const result = allPops.map((pop) => {
      const statusRecord = statusMap.get(pop._id.toString());
      return {
        popId: pop._id,
        popCode: pop.popCode,
        name: pop.name,
        dep: pop.dep,
        group: pop.group,
        type: pop.type || '',
        description: pop.description,
        qtyPlaced: statusRecord ? statusRecord.qtyPlaced : 0,
        qtyTotal: statusRecord ? statusRecord.qtyTotal : 0,
        updatedAt: statusRecord ? statusRecord.updatedAt : null,
      };
    });

    res.status(200).json({
      status: 200,
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
    // Ожидаем массив [{ popId: "...", qtyPlaced: 5, qtyTotal: 10 }, ...]
    const { statuses } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(statuses) || statuses.length === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Bad Request: statuses array is required.',
      });
    }

    const operations = statuses.map((item) => ({
      updateOne: {
        filter: { shopId, popId: item.popId },
        update: {
          $set: {
            qtyPlaced: Number(item.qtyPlaced) || 0,
            qtyTotal: Number(item.qtyTotal) || 0,
            updatedBy: userId,
          },
        },
        upsert: true,
      },
    }));

    await ShopPopStatusesCollection.bulkWrite(operations);

    res.status(200).json({
      status: 200,
      message: 'POP quantities updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// -------------

export const exportPopStatusesController = async (req, res, next) => {
  try {
    const statuses = await ShopPopStatusesCollection.find()
      .populate('shopId', 'name storeId city address')
      .populate('popId', 'popCode name group dep')
      .populate('updatedBy', 'name email')
      .lean();

    // 2. Создаем рабочую книгу Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Отчет по POP');

    // 3. Задаем колонки таблицы
    worksheet.columns = [
      { header: 'MCS ID', key: 'storeId', width: 15 },
      { header: 'Shop', key: 'shopName', width: 30 },
      { header: 'City', key: 'city', width: 18 },
      { header: 'POP ID', key: 'popCode', width: 18 },
      { header: 'POP name', key: 'popName', width: 30 },
      { header: 'POP type', key: 'popType', width: 15 },
      { header: 'Group', key: 'group', width: 12 },
      { header: 'DEP', key: 'dep', width: 12 },
      { header: 'Placed', key: 'qtyPlaced', width: 15 },
      { header: 'Total products', key: 'qtyTotal', width: 15 },
      { header: 'Merch ID', key: 'merchandiser', width: 25 },
      { header: 'Date', key: 'updatedAt', width: 20 },
    ];

    // Стилизуем шапку (жирный шрифт и серый фон)
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE2E8F0' },
    };

    // 4. Заполняем строки чистыми плоскими данными вместо объектов
    statuses.forEach((item) => {
      worksheet.addRow({
        storeId: item.shopId?.storeId || '-',
        shopName: item.shopId?.name || 'Удаленный магазин',
        city: item.shopId?.city || '-',
        popCode: item.popId?.popCode || '-',
        popName: item.popId?.name || 'Удаленный POP',
        popType: item.popId?.type || '-',
        group: item.popId?.group || '-',
        dep: item.popId?.dep || '-',
        qtyPlaced: item.qtyPlaced || 0,
        qtyTotal: item.qtyTotal || 0,
        merchandiser: item.updatedBy?.name || 'Неизвестно',
        updatedAt: item.updatedAt
          ? new Date(item.updatedAt).toLocaleString('ru-RU')
          : '-',
      });
    });

    // 5. Заголовки для скачивания файла
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=pop_audit_report.xlsx',
    );

    // 6. Отправляем готовый файл во флоке
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export Error:', error);
    next(error);
  }
};
