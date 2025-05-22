import { getPlansController } from '../controllers/plans.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const plansRouter = Router();

plansRouter.get('/plans', authenticate, ctrlWrapper(getPlansController));
export default plansRouter;
