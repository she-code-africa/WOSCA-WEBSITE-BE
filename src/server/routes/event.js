import { Router } from 'express';
import {
  createEvent, getEvents, getEvent, updateEvent, deleteEvent, searchEvent,
} from '../controllers/event.controller';
import AuthMiddleware from '../middlewares/authorization';
import rbac from '../middlewares/rbac';

const eventRouter = Router();

eventRouter.get('/search', searchEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:eventId', getEvent);
eventRouter.post('', AuthMiddleware, rbac('admin'), createEvent);
eventRouter.put('/:eventId', AuthMiddleware, rbac('admin'), updateEvent);
eventRouter.delete('/:eventId', AuthMiddleware, rbac('admin'), deleteEvent);
export default eventRouter;
