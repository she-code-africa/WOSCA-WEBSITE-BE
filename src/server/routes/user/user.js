import { Router } from 'express';
import { getUsers, getOneUser } from '../../controllers/user/user.controller';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:userId', getOneUser);

export default userRouter;
