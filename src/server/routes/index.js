import express from 'express';
import indexRouter from './auth';
import eventRouter from './event/event';
import PullRequestsRouter from './pull-requests/pr';
import userRouter from './user/user';

const router = express.Router();

router.use('/', indexRouter);
router.use('/events', eventRouter);
router.use('/pulls', PullRequestsRouter);
router.use('/users', userRouter);

export default router;
