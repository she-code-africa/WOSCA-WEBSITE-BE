import { uuid } from 'uuidv4';
import { SchemaTypes } from 'mongoose';

/**
 * this removes _id field in subdocuments and allows virtual fields to be returned
 */
export const readMapper = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret, options) => {
      delete ret._id;
      if (ret.password) delete ret.password;
      return ret;
    },
  },
};

/**
 * this defines timestamps fields in a schema
 */
export const timestamps = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

/**
 * this replaces the default mongoose id with a uuidv4 string
 */
export const uuidv4 = {
  type: SchemaTypes.String,
  default: uuid,
};

/**
 * this trims a string schema type and changes it to lowercase
 */
export const trimmedLowercaseString = {
  type: SchemaTypes.String,
  trim: true,
  lowercase: true,
};

/**
 * this trims a string schema type
 */
export const trimmedString = {
  type: SchemaTypes.String,
  trim: true,
};

/**
 * this changes a string schema type to lowercase
 */
export const lowercaseString = {
  type: SchemaTypes.String,
  lowercase: true,
};
