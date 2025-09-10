import { getDavMotivationController } from '../controllers/motivation.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
const motivationRouter = Router();

motivationRouter.get(
  '/davMotivation',
  authenticate,
  ctrlWrapper(getDavMotivationController),
);
export default motivationRouter;
