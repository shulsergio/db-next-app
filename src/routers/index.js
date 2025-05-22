import { Router } from 'express';
import authRouter from './auth.js';
import plansRouter from './plans.js';

const router = Router();
console.log('***** CONSOLE - index - IS OK');
router.use('/auth', authRouter);
router.use('/plans', plansRouter);
export default router;
