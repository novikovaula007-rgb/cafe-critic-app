import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Image = model('Image', ImageSchema);
