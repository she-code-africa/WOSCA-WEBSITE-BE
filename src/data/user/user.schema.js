import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import env from '../../common/config/env';
import { readMapper, uuidv4, trimmedString } from '../utils/schema.utils';

const UserSchema = new Schema({
  _id: { ...uuidv4 },
  username: {
    type: String,
    required: true,
    ...trimmedString,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['regular', 'admin'],
    default: 'regular',
  },
},
{
  ...readMapper,
});
/**
 * Pre-save hook for hashing passwords the first time a user creates an account.
 * @param next mongoose hook next function
 */
UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(this.password, env.salt_rounds);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});
/**
 * Mongoose document instance method used to check if a plain text
 * matches the password field of a user's document
 * @param plainText plain text password to be validated
 */
UserSchema.methods.validatePassword = async function validatePassword(plainText) {
  const isValidPassword = await bcrypt.compare(plainText, this.password);
  if (!isValidPassword) { throw new Error('Invalid credentails provided. Please try again.'); }
};

const User = mongoose.model('User', UserSchema);
export default User;