import { Router } from 'express';

const adminRouter = Router();
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllPlansController,
  getAllUsersController,
  getPromotersController,
} from '../controllers/admin.js';
import { getShopByIdController } from '../controllers/shops.js';
import requirePermission from '../middleware/requirePermission.js';

adminRouter.get(
  '/plans',
  authenticate,
  requirePermission('canViewUsersPlans'),
  ctrlWrapper(getAllPlansController),
);

adminRouter.get(
  '/promoters',
  authenticate,
  requirePermission('canViewUsersData'),
  ctrlWrapper(getPromotersController),
);

adminRouter.get(
  '/allPromoters',
  authenticate,
  requirePermission('canViewUsersData'),
  ctrlWrapper(getAllUsersController),
);

adminRouter.get('/shops', authenticate, ctrlWrapper(getShopByIdController));
export default adminRouter;
