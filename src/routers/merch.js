import { Router } from 'express';
import {
  getMerchInventoryController,
  updateMerchInventoryController,
} from '../controllers/merchInventoryController.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

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

export default merchRouter;
