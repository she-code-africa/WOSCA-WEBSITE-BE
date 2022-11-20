import { Router } from 'express';
import {
  createUser, signin, forgotPassword, resetPasswordConfirmation, updateUserRole,
} from '../controllers/auth';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const router = Router();

router.post('/signup', createUser);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password-confirmation', resetPasswordConfirmation);
router.patch('/role/:userId', AuthMiddleware, rbac('admin'), updateUserRole);
export default router;
