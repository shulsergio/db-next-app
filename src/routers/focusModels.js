import { getFocusModelsController } from '../controllers/focusModels.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const focusModelsRouter = Router();

focusModelsRouter.get('/', authenticate, ctrlWrapper(getFocusModelsController));
export default focusModelsRouter;
