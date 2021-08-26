import { Router } from 'express';
import {
  createEvent, getEvents, getEvent, updateEvent, deleteEvent,
} from '../../controllers/event/event.controller';
import validator from '../../middlewares/validator';
import { createEventValidation } from '../../controllers/event/event.validation';

const eventRouter = Router();

eventRouter.get('/', getEvents);
eventRouter.post('/', validator(createEventValidation), createEvent);
eventRouter.get('/{id}', getEvent);
eventRouter.put('/{id}', updateEvent);
eventRouter.delete('/{id}', deleteEvent);

export default eventRouter;
