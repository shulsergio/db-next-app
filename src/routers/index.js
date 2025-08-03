import { Router } from 'express';
import authRouter from './auth.js';
import plansRouter from './plans.js';
import adminRouter from './admin.js';
import ihsRouter from './ihs.js';
import matrixRouter from './matrix.js';

const indexRouter = Router();
console.log('***** CONSOLE - index - IS OK');
indexRouter.use('/auth', authRouter);
indexRouter.use('/users', authRouter);
indexRouter.use('/shops', authRouter);
indexRouter.use('/plans', plansRouter);
indexRouter.use('/admin', adminRouter);
indexRouter.use('/ihsdatas', ihsRouter);
indexRouter.use('/matrixDatas', matrixRouter);
export default indexRouter;
