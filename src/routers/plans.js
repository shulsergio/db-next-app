import {
  getListOfTopBonusesByStoreController,
  getPlansController,
  getweeklyPromsPlansController,
} from '../controllers/plans.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const plansRouter = Router();

plansRouter.get('/', authenticate, ctrlWrapper(getPlansController));
plansRouter.get(
  '/weeklyPromsPlans',
  authenticate,
  ctrlWrapper(getweeklyPromsPlansController),
);
plansRouter.get(
  '/topBonus/:storeId',
  authenticate,
  ctrlWrapper(getListOfTopBonusesByStoreController),
);
export default plansRouter;
