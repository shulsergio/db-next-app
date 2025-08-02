import { getPlansController, getTopBonusesByStoreController } from '../controllers/plans.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const plansRouter = Router();

plansRouter.get('/', authenticate, ctrlWrapper(getPlansController));
plansRouter.get('/:id/bonus', authenticate, ctrlWrapper(getTopBonusesByStoreController));
export default plansRouter;
