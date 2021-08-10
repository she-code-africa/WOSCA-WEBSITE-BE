import { Router } from 'express';
import { createUser, signin } from '../../controllers/user/user.controller';
import validator from '../../middlewares/validator';
import { createUserValidation } from '../../controllers/user/user.validation';

const router = Router();

router.post('/signup', validator(createUserValidation), createUser);
router.post('/signin', signin);
export default router;
