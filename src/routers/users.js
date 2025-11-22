import { Router } from 'express';
import {
  getUserByIdController,
  patchDateOfBirthController,
  patchPasswordController,
  //   patchUserController,
} from '../controllers/users.js';
import { authenticate } from '../utils/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.get('/:id', authenticate, ctrlWrapper(getUserByIdController));
usersRouter.patch(
  '/password',
  authenticate,
  ctrlWrapper(patchPasswordController),
);

usersRouter.patch(
  '/:id/dateOfBirth',
  authenticate,
  ctrlWrapper(patchDateOfBirthController),
);

export default usersRouter;
