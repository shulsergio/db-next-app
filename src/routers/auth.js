import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();
authRouter.post('/register', ctrlWrapper(registerUserController));
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.get('/refresh', ctrlWrapper(refreshUserSessionController));
export default authRouter;
