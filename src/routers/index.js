import { Router } from 'express';
import authRouter from './auth.js';
import plansRouter from './plans.js';
import adminRouter from './admin.js';

const indexRouter = Router();
console.log('***** CONSOLE - index - IS OK');
indexRouter.use('/auth', authRouter);
indexRouter.use('/plans', plansRouter);
indexRouter.use('/admin', adminRouter);

export default indexRouter;
