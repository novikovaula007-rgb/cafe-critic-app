import {
  Document,
  type HydratedDocument,
  model,
  type Model,
  Schema,
} from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { UserMethods } from './types/model.types';
import type { UserFields } from '../../types/user/user.types';
import regex from './regex/regex';
import config from '../../config';

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new Schema<
  HydratedDocument<UserFields>,
  UserModel,
  UserMethods
>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => {
        return regex.email.test(email);
      },
      message: 'Invalid email address',
    },
  },
  displayName: {
    type: String,
    required: true,
    validator: (value: string) => {
      return regex.displayName.test(value);
    },
    message: 'Invalid display name',
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  refreshToken: {
    type: String,
  },
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;

  const hash = await argon2.hash(this.password);
  return (this.password = hash);
});

UserSchema.set('toJSON', {
  transform(_doc, ret, _options) {
    const { password, __v, refreshToken, ...user } = ret;
    return user;
  },
});

UserSchema.methods.checkPassword = async function (password) {
  if (!this.password) return false;
  return argon2.verify(this.password, password);
};

UserSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign({ _id: this._id }, config.refreshJWTSecret, {
    expiresIn: '7d',
  });

  this.refreshToken = refreshToken;
  return refreshToken;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, config.accessJWTSecret, {
    expiresIn: '15m',
  });
};

UserSchema.path('email').validate({
  validator: async function (this: Document, email) {
    if (!this.isModified('email')) return true;

    const user = await User.exists({ email });

    return !user;
  },

  message: 'User already exists',
});

const User = model('User', UserSchema);

export default User;
