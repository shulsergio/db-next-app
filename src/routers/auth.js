import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  updateUniformController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../utils/authenticate.js';

const authRouter = Router();
authRouter.post('/register', ctrlWrapper(registerUserController));
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.get('/refresh', ctrlWrapper(refreshUserSessionController));
authRouter.patch('/:id/uniform', authenticate, ctrlWrapper(updateUniformController));

export default authRouter;
