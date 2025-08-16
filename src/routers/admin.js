import { Router } from 'express';

const adminRouter = Router();
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllPlansController,
  getAllUsersController,
} from '../controllers/admin.js';
import { getShopByIdController } from '../controllers/shops.js';

adminRouter.get('/plans', authenticate, ctrlWrapper(getAllPlansController));

adminRouter.get('/promoters', authenticate, ctrlWrapper(getAllUsersController));
adminRouter.get('/shops', authenticate, ctrlWrapper(getShopByIdController));
export default adminRouter;
