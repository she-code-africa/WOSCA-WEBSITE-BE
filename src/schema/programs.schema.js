import mongoose, { Schema } from 'mongoose';
import Slug from 'mongoose-slug-updater';
import { uuidv4, trimmedString, timestamps } from './utils/schema.utils';

const ProgramSchema = new Schema({
  _id: { ...uuidv4 },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    ...trimmedString,
  },
},
{
  ...timestamps,
});

mongoose.plugin(Slug);
const Program = mongoose.model('Program', ProgramSchema);
export default Program;
