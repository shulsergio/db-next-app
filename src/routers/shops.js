import { getMerchShopsController } from '../controllers/merch.js';
import {
  getShopPopsController,
  updateShopPopsController,
} from '../controllers/pops.js';
import {
  getAllShopsController,
  getShopByIdController,
} from '../controllers/shops.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

const shopsRouter = Router();

shopsRouter.get(
  '/merch/shops',
  authenticate,
  ctrlWrapper(getMerchShopsController),
);

shopsRouter.get(
  '/:shopId/pops',
  authenticate,
  ctrlWrapper(getShopPopsController),
);

shopsRouter.post(
  '/:shopId/pops',
  authenticate,
  ctrlWrapper(updateShopPopsController),
);
shopsRouter.get('/:storeId', authenticate, ctrlWrapper(getShopByIdController));
shopsRouter.get('/', authenticate, ctrlWrapper(getAllShopsController));

export default shopsRouter;
