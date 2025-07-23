import { getNewdataController } from '../controllers/newdata.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const newdataRouter = Router();

newdataRouter.get('/', authenticate, ctrlWrapper(getNewdataController));
export default newdataRouter;
;
