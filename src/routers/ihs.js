import { getIhsController } from '../controllers/ihs.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const ihsRouter = Router();

ihsRouter.get('/', authenticate, ctrlWrapper(getIhsController)); 
export default ihsRouter;
