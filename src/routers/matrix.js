
import { getMatrixController } from '../controllers/matrix.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const matrixRouter = Router();

matrixRouter.get('/', authenticate, ctrlWrapper(getMatrixController)); 
export default matrixRouter;
