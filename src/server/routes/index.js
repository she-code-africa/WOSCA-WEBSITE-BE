import express from 'express';
import indexRouter from './auth';

const router = express.Router();
router.use('/api/v1', indexRouter);
router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to WOSCA site API' }));
export default router;
