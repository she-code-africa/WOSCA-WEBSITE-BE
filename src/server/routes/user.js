import { Router } from 'express';
import {
  getAllUsers,
} from '../controllers/user';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const userRouter = Router();

userRouter.get('/', AuthMiddleware, rbac('admin'), getAllUsers);

export default userRouter;
