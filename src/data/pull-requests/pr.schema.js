import mongoose, { Schema } from 'mongoose';
import Autopopulate from 'mongoose-autopopulate';
import {
  uuidv4, timestamps, trimmedString,
} from '../utils/schema.utils';

const PullRequestSchema = new Schema({
  _id: { ...uuidv4 },
  pr_link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  user: {
    ...trimmedString,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
},
{
  ...timestamps,
});

const PullRequests = mongoose.model('PullRequests', PullRequestSchema);
PullRequestSchema.plugin(Autopopulate);
export default PullRequests;
