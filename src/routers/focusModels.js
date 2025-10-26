import { getFocusModelsController } from '../controllers/focusModels.js';
import requirePermission from '../middleware/requirePermission.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const focusModelsRouter = Router();

focusModelsRouter.get(
  '/:type',
  authenticate,
  requirePermission('canViewUsersFocus'),
  ctrlWrapper(getFocusModelsController),
);
export default focusModelsRouter;
