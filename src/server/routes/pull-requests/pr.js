import { Router } from 'express';
import { submitPullRequest } from '../../controllers/pull-requests/pr.controller';
import validator from '../../middlewares/validator';
import { submitPRValidation } from '../../controllers/pull-requests/pr.validation';
import AuthMiddleware from '../../middlewares/authorization';
import rbac from '../../middlewares/rbac';

const PullRequestsRouter = Router();

PullRequestsRouter.post('/', AuthMiddleware, rbac('user'), validator(submitPRValidation), submitPullRequest);

export default PullRequestsRouter;
