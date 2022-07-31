import { Router } from 'express';
import {
  createProgram, getPrograms,
} from '../controllers/programs';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const programRouter = Router();

programRouter.get('/', getPrograms);
programRouter.post('/', AuthMiddleware, rbac('admin'), createProgram);

export default programRouter;
