/* eslint-disable import/prefer-default-export */
import Event from '../../../data/event/event.schema';
import { errorResponse, successResponse } from '../../utils/responsehandler';

export const createEvent = async (req, res, next) => {
  try {
    const { body } = req;
    const { name } = body;

    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return errorResponse(res, req, 409, { message: 'An event with this name already exist' });
    }
    const event = await Event.create({ ...body });

    return successResponse(res, req, 201, { message: 'Event created successfully', event });
  } catch (err) {
    return next(err);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return successResponse(res, req, 200, { message: 'All events', events });
  } catch (error) {
    return next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.eventId });
    return successResponse(res, req, 200, { message: 'This event', event });
  } catch (error) {
    return next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const { body } = req;
    const id = req.params.eventId;

    const existingEvent = await Event.findById({ _id: id });
    if (!existingEvent) {
      return errorResponse(res, req, 409, { message: 'Event does not exist' });
    }

    const event = await Event.findByIdAndUpdate(id, { $set: body }, { new: true });
    return successResponse(res, req, 200, { message: 'Event updated successfully', event });
  } catch (error) {
    return next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const id = req.params.accomplishmentId;
    await Event.findByIdAndDelete(id);
    return successResponse(res, req, 200, { message: 'Event deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
