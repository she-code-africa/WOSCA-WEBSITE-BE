import { Router } from 'express';
import {
  createUser, signin, forgotPassword, resetPasswordConfirmation,
} from '../controllers/auth';

const router = Router();

router.post('/signup', createUser);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password-confirmation', resetPasswordConfirmation);
export default router;
