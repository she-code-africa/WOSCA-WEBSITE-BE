import mongoose, { Schema } from 'mongoose';
import Slug from 'mongoose-slug-updater';
import { uuidv4, trimmedString, timestamps } from '../utils/schema.utils';

const EventSchema = new Schema({
  _id: { ...uuidv4 },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  slug: {
    ...trimmedString,
    slug: 'name',
    index: true,
    unique: true,
    slugPaddingSize: 4,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },

},
{
  ...timestamps,
});

mongoose.plugin(Slug);
const Event = mongoose.model('Event', EventSchema);
export default Event;
