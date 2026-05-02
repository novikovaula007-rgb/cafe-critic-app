import { Router } from 'express';
import { imagesUpload } from '../../middlewares/multer';
import auth, { RequestWithUser } from '../../middlewares/auth';
import isValidationError from '../../utils/validationError';
import { Place } from '../../models/place/Place';
import { isValidObjectId } from 'mongoose';
import { Review } from '../../models/review/Review';
import { Image } from '../../models/image/Image';
import { calculatePlaceRatings } from '../../utils/calculateRating';
import { ReviewFields } from '../../types/review/review.types';
import permit from '../../middlewares/permit';

const placesRouter = Router();

placesRouter.post(
  '/',
  auth,
  imagesUpload.single('mainPhoto'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;

      if (!req.body.agreement) {
        return res.status(400).json({
          error: 'You must agree to the establishment terms of publication',
        });
      }

      const newPlace = new Place({
        title: req.body.title,
        description: req.body.description,
        mainPhoto: req.file ? req.file.filename : null,
        user: user._id,
      });

      await newPlace.save();

      res.json({
        message: 'The new place was successfully created',
        newPlace,
      });
    } catch (error) {
      if (isValidationError(error)) {
        res.status(400).json({ error: isValidationError(error) });
      }

      next(error);
    }
  },
);

placesRouter.get('/', async (req, res, next) => {
  try {
    const places = await Place.find().populate('user').lean();

    const placesWithStats = await Promise.all(
      places.map(async (place) => {
        const reviews = await Review.find({ place: place._id }).lean();
        const imagesCount = await Image.countDocuments({ place: place._id });

        const ratings = calculatePlaceRatings(
          reviews as unknown as ReviewFields[],
        );

        return {
          ...place,
          mainPhoto: place.mainPhoto,
          overallRating: ratings.overall,
          reviewsCount: reviews.length,
          photosCount: imagesCount,
        };
      }),
    );

    res.json(placesWithStats);
  } catch (error) {
    next(error);
  }
});

placesRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid place ID' });
  }

  try {
    const place = await Place.findById(id).populate('user');

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    const reviews = await Review.find({ place: place._id })
      .populate('author')
      .lean();
    const gallery = await Image.find({ place: place._id });

    const ratings = calculatePlaceRatings(reviews as unknown as ReviewFields[]);
    res.json({
      ...place,
      reviews,
      gallery,
      ratings,
    });
  } catch (error) {
    next(error);
  }
});

placesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id) || !id) {
    return res.status(400).json({ error: 'Invalid place ID' });
  }

  try {
    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }

    await Place.findByIdAndDelete(id);
    await Review.deleteMany({ place: id });
    await Image.deleteMany({ place: id });

    res.send({ message: 'Deleted successfully' });
  } catch (error) {
    next();
  }
});

export default placesRouter;