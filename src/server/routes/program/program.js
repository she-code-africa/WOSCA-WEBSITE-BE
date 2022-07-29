import { Router } from 'express';
import {
  createProgram, getPrograms,
} from '../../controllers/program/program.controller';
import validator from '../../middlewares/validator';
import AuthMiddleware from '../../middlewares/authorization';
import rbac from '../../middlewares/rbac';
import { createProgramValidation } from '../../controllers/program/program.validation';

const programRouter = Router();

programRouter.get('/', getPrograms);
programRouter.post('/', AuthMiddleware, rbac('admin'), validator(createProgramValidation), createProgram);

export default programRouter;
