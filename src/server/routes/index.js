import express from 'express';
import indexRouter from './auth';

const router = express.Router();
router.use('/api/v1', indexRouter);
export default router;
