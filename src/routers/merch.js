import { Router } from 'express';
import {
  getMerchInventoryController,
  updateMerchInventoryController,
} from '../controllers/merchInventoryController';
import { authenticate } from '../utils/authenticate';
import { ctrlWrapper } from '../utils/ctrlWrapper';

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
