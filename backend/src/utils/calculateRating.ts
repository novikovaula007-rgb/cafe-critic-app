import { ReviewFields } from '../types/review/review.types';
import { RatingObject } from '../types/place/place.types';

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return Number((sum / numbers.length).toFixed(1));
};

export const calculatePlaceRatings = (reviews: ReviewFields[]) => {
  if (reviews.length === 0) {
    return {
      qualityOfFood: 0,
      serviceQuality: 0,
      interior: 0,
      overall: 0,
    };
  }

  const foodRatings = reviews.map((r) => r.qualityOfFood);
  const serviceRatings = reviews.map((r) => r.serviceQuality);
  const interiorRatings = reviews.map((r) => r.interior);

  const averageFoodRating = calculateAverage(foodRatings);
  const averageServiceRating = calculateAverage(serviceRatings);
  const averageInteriorRating = calculateAverage(interiorRatings);

  const ratingObject: RatingObject = {
    qualityOfFood: averageFoodRating,
    serviceQuality: averageServiceRating,
    interior: averageInteriorRating,
    overall: calculateAverage([
      averageFoodRating,
      averageServiceRating,
      averageInteriorRating,
    ]),
  };

  return ratingObject;
};
