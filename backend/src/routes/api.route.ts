import { Router } from 'express';
import usersRouter from './user/user.route';
import placesRouter from './place/place.route';
import reviewsRoute from './review/review.route';
import galleryRoute from './gallery/gallery.route';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/places', placesRouter);
apiRouter.use('/reviews', reviewsRoute);
apiRouter.use('/gallery', galleryRoute);

export default apiRouter;
