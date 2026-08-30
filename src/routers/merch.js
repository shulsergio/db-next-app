import { Router } from 'express';
import {
  exportMerchInventoryController,
  getMerchInventoryController,
  updateMerchInventoryController,
} from '../controllers/merchInventoryController.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getPopMetricsController } from '../controllers/merch.js';

const merchRouter = Router();

merchRouter.get(
  '/inventory',
  authenticate,
  ctrlWrapper(getMerchInventoryController),
);

merchRouter.post(
  '/inventory',
  authenticate,
  ctrlWrapper(updateMerchInventoryController),
);

merchRouter.get(
  '/inventory/export',
  authenticate,
  ctrlWrapper(exportMerchInventoryController),
);

merchRouter.get(
  '/analytics/pop-metrics',
  authenticate,
  ctrlWrapper(getPopMetricsController),
);

export default merchRouter;
