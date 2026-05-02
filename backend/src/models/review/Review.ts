import { model, Schema } from 'mongoose';

const ReviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  qualityOfFood: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  serviceQuality: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  interior: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = model('Review', ReviewSchema);
