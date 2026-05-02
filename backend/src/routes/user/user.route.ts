import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserReg } from '../../types/user/user.types';
import User from '../../models/user/User';
import { clearCookieToken, setCookieToken } from '../../utils/sendToken';
import { MINUTES_15, WEEK } from '../../constants/constants';
import isValidationError from '../../utils/validationError';
import auth, { RequestWithUser } from '../../middlewares/auth';
import config from '../../config';

const usersRouter = Router();

usersRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const body: UserReg = req.body;

    const correctUserData: UserReg = {
      email: body.email,
      displayName: body.displayName,
      password: body.password,
    };

    try {
      const user = new User(correctUserData);
      const refreshToken = user.generateRefreshToken();
      const accessToken = user.generateAccessToken();

      setCookieToken(res, 'refreshToken', refreshToken, WEEK);
      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      await user.save();
      res.json({
        message: 'Registration successful',
        user,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      next(error);
    }
  },
);

usersRouter.post(
  '/sessions',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User is not found' });
      }

      const isMatch: boolean = await user.checkPassword(password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Password is incorrect' });
      }

      const refreshToken: string = user.generateRefreshToken();
      const accessToken: string = user.generateAccessToken();

      setCookieToken(res, 'refreshToken', refreshToken, WEEK);
      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      res.json({
        message: 'Authentication successful',
        user,
      });
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.delete(
  '/sessions',
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as RequestWithUser;

      user.refreshToken = '';
      await user.save();

      clearCookieToken(res, 'refreshToken');
      clearCookieToken(res, 'accessToken');

      return res.json({
        message: 'Logout successfully!',
      });
    } catch (error) {
      next(error);
    }
  },
);

usersRouter.post(
  '/token',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: 'No refresh token present',
        });
      }

      const decoded = jwt.verify(refreshToken, config.refreshJWTSecret) as {
        _id: string;
      };

      const user = await User.findOne({
        _id: decoded._id,
        refreshToken,
      });

      if (!user) {
        return res.status(401).json({
          error: 'Invalid or expired refresh token',
        });
      }

      const accessToken = user.generateAccessToken();

      if (!accessToken) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      setCookieToken(res, 'accessToken', accessToken, MINUTES_15);

      res.json({
        message: 'Access token refreshed successfully',
      });
    } catch (error) {
      res.status(401).json({
        error: 'Invalid or expected refresh token',
      });
      next(error);
    }
  },
);

export default usersRouter;
