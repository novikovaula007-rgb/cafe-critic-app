export interface User {
  _id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface Place {
  _id: string;
  user: string;
  title: string;
  description: string;
  mainPhoto: string | null;
  ratings?: {
    qualityOfFood: number;
    serviceQuality: number;
    interior: number;
    overall: number;
  };
  reviews?: Review[];
  overallRating: number;
  reviewsCount: number;
  photosCount: number;
}

export interface PlaceMutation {
  title: string;
  description: string;
  mainPhoto: File | null;
  agreement?: boolean;
}

export interface GalleryImage {
  _id: string;
  url: string;
  place: string;
  user: string;
}

export interface Review {
  _id: string;
  comment: string;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
  author: {
    _id: string;
    displayName: string;
  };
  place: string;
  createdAt: string;
}

export interface ReviewMutation {
  placeId?: string;
  comment: string;
  qualityOfFood: number;
  serviceQuality: number;
  interior: number;
}

export interface GalleryMutation {
  images: File[];
}
