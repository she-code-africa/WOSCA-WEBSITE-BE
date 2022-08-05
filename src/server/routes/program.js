import { Router } from 'express';
import {
  createProgram, getPrograms, updatePrograms,
} from '../controllers/programs';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const programRouter = Router();

programRouter.get('/', getPrograms);
programRouter.post('/', AuthMiddleware, rbac('admin'), createProgram);
programRouter.put('/:programId', AuthMiddleware, rbac('admin'), updatePrograms);
export default programRouter;
