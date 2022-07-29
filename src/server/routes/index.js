import express from 'express';
import indexRouter from './auth';
import eventRouter from './event/event';
import PullRequestsRouter from './pull-requests/pr';
import ProgramRouter from './program/program';

const router = express.Router();

router.use('/', indexRouter);
router.use('/events', eventRouter);
router.use('/pulls', PullRequestsRouter);
router.use('programs', ProgramRouter);

export default router;
