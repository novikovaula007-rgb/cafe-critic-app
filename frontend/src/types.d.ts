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
}

export interface PlaceMutation {
  title: string;
  description: string;
  mainPhoto: File | null;
}
