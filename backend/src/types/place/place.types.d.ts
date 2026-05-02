import { UserFields } from '../user/user.types';

export interface RatingObject {
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
  overall: number;
}

export interface PlaceFields {
  description: string;
  title: string;
  mainPhoto: string;
  user: string | UserFields;
}
