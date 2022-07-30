import Event from '../../schema/event.schema';
import { errorResponse, paginatedOptions, successResponse } from '../utils/responsehandler';
import { createEventValidation } from '../utils/validation';

export const createEvent = async (req, res) => {
  try {
    const { body } = req;
    const { error } = createEventValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400, req);

    let { location } = req.body;
    location = location.toLowerCase();
    const event = await Event.create({ ...body, location });
    return successResponse(res, 201, 'Event created successfully', event, req);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getEvents = async (req, res) => {
  try {
    const { query } = req;
    const data = paginatedOptions(query);
    const events = await Event.aggregate([
      { $sort: { created_at: -1 } },
      {
        $facet: {
          totalCount: [{ $count: 'total' }],
          data,
        },
      },
    ]);
    return successResponse(res, 200, 'All events', events, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const getEvent = async (req, res) => {
  try {
    const { params: { eventId } } = req;
    const event = await Event.findOne({ _id: eventId });
    if (!event) {
      return errorResponse(res, 'Event not found!', 404, req);
    }
    return successResponse(res, 200, 'Successfully retrieved event', event, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { body, params: { eventId } } = req;

    const existingEvent = await Event.findById({ _id: eventId });
    if (!existingEvent) {
      return errorResponse(res, 'Event not found!', 404, req);
    }
    const event = await Event.findByIdAndUpdate(eventId, { $set: body }, { new: true });
    return successResponse(res, 200, 'Event updated successfully', event, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { params: { eventId } } = req;
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return errorResponse(res, 'Event not found!', 404, req);
    }
    return successResponse(res, 200, 'Event deleted successfully', event, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};

// implement event search functionality using location, timezone that is start time

export const searchEvent = async (req, res) => {
  try {
    const { query: { location, startTime } } = req;

    if (location) {
      const events = await Event.find({ location: { $regex: location, $options: 'i' } });

      return successResponse(res, 200, 'All events', events, req);
    }
    if (startTime) {
      const events = await Event.find({ startTime });
      return successResponse(res, 200, 'All events', events, req);
    }
    return errorResponse(res, 'No query parameter passed', 400, req);
  } catch (error) {
    return errorResponse(res, error.message, 500, req);
  }
};
