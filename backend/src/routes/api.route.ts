import { Router } from 'express';
import usersRouter from './user/user.route';
import placesRouter from './place/place.route';
import reviewsRoute from './review/review.route';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/places', placesRouter);
apiRouter.use('/reviews', reviewsRoute);

export default apiRouter;
