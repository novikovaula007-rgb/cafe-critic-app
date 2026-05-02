import { UserFields } from '../user/user.types';
import { PlaceFields } from '../place/place.types';
import { Schema } from 'mongoose';

export interface ReviewFields {
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
  comment: string;
  author: string | UserFields | Schema.Types.ObjectId;
  place: string | PlaceFields | Schema.Types.ObjectId;
}