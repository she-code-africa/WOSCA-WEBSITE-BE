import { Router } from 'express';
import {
  createUser, signin, forgotPassword, resetPasswordConfirmation,
} from '../../controllers/user/user.controller';
import validator from '../../middlewares/validator';
import {
  createUserValidation, userLoginValidation, passwordResetRequest,
} from '../../controllers/user/user.validation';

const router = Router();

router.post('/signup', validator(createUserValidation), createUser);
router.post('/signin', validator(userLoginValidation), signin);
router.post('/forgot-password', validator(passwordResetRequest), forgotPassword);
router.post('/reset-password-confirmation', resetPasswordConfirmation);
export default router;
