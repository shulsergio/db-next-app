import { getShopByIdController } from '../controllers/shops.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const shopsRouter = Router();

shopsRouter.get('/:storeId', authenticate, ctrlWrapper(getShopByIdController));
export default shopsRouter;
