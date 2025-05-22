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
authRouter.post('/login', (req, res) => {
  ctrlWrapper(loginUserController);
});
authRouter.post('/logout', (req, res) => {
  ctrlWrapper(logoutUserController);
});
authRouter.get('/refresh', (req, res) => {
  ctrlWrapper(refreshUserSessionController);
});
export default authRouter;
