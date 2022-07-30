import express from 'express';
import authRouter from './auth';
import eventRouter from './event';
import PullRequestsRouter from './pr';
import ProgramRouter from './program';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/events', eventRouter);
router.use('/pulls', PullRequestsRouter);
router.use('/programs', ProgramRouter);

export default router;
