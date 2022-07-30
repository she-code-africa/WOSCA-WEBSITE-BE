import { Router } from 'express';
import {
  submitPullRequest, getOnePullRequest, getPullRequests, updatePullRequests,
} from '../controllers/pr.controller';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const PullRequestsRouter = Router();

PullRequestsRouter.post('/', AuthMiddleware, rbac('user'), submitPullRequest);

PullRequestsRouter.get('/', AuthMiddleware, getPullRequests);

PullRequestsRouter.get('/:prId', AuthMiddleware, getOnePullRequest);
PullRequestsRouter.put('/:prId', AuthMiddleware, rbac('admin'), updatePullRequests);

export default PullRequestsRouter;
