import { Router } from 'express';

const adminRouter = Router();
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllPlansController,
  getAllUsersController,
} from '../controllers/admin.js';

adminRouter.get('/plans', authenticate, ctrlWrapper(getAllPlansController));

adminRouter.get('/promoters', authenticate, ctrlWrapper(getAllUsersController));
// adminRouter.get('/users', authenticate, ctrlWrapper(getAllUsersController));
export default adminRouter;
