import express from 'express';
import indexRouter from './auth';
import eventRouter from './event/event';

const router = express.Router();

router.use('/', indexRouter);
router.use('/events', eventRouter);

export default router;
