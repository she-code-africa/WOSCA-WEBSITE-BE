import { Router } from 'express';
import {
  createEvent, getEvents, getEvent, updateEvent, deleteEvent, searchEvent,
} from '../../controllers/event/event.controller';
import validator from '../../middlewares/validator';
import AuthMiddleware from '../../middlewares/authorization';
import rbac from '../../middlewares/rbac';
import { createEventValidation } from '../../controllers/event/event.validation';

const eventRouter = Router();

eventRouter.get('/search', searchEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:eventId', getEvent);
eventRouter.post('/', AuthMiddleware, rbac('admin'), validator(createEventValidation), createEvent);
eventRouter.put('/:eventId', AuthMiddleware, rbac('admin'), updateEvent);
eventRouter.delete('/:eventId', AuthMiddleware, rbac('admin'), deleteEvent);
export default eventRouter;
