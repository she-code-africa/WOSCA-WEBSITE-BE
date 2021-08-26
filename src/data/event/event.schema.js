import mongoose, { Schema } from 'mongoose';
import { uuidv4, trimmedString } from '../utils/schema.utils';

const EventSchema = new Schema({
  _id: { ...uuidv4 },
  name: {
    type: String,
    required: true,
    unique: true,
    ...trimmedString,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endtime: {
    type: Date,
    required: true,
  },

});

const Event = mongoose.model('Event', EventSchema);
export default Event;
