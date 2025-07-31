
import { Router } from 'express';
import { getUserByIdController } from '../controllers/users.js'; 
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.get('/:id', authenticate, ctrlWrapper(getUserByIdController));

export default usersRouter;