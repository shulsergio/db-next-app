import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();
console.log('***** CONSOLE - index - IS OK');
router.use('/auth', authRouter);
export default router;
