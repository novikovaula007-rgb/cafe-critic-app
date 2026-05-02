import { Router } from 'express';
import auth, { RequestWithUser } from '../../middlewares/auth';
import { Review } from '../../models/review/Review';
import { isValidObjectId } from 'mongoose';

const reviewsRouter = Router();

reviewsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { comment, qualityOfFood, serviceQuality, interior, placeId } =
      req.body;
    const { user } = req as RequestWithUser;

    const ratings: number[] = [qualityOfFood, serviceQuality, interior];
    if (ratings.some((r) => r < 1 || r > 5)) {
      return res
        .status(400)
        .json({ error: 'All ratings must be numbers from 1 to 5' });
    }

    if (!comment || !placeId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newReview = new Review({
      comment,
      qualityOfFood,
      serviceQuality,
      interior,
      place: placeId,
      author: user._id,
    });

    await newReview.save();

    const populatedReview = await Review.findById(newReview._id)
      .populate('author', 'displayName')
      .lean();

    res.send(populatedReview);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get('/', async (req, res, next) => {
  try {
    const placeId = req.query.placeId as string;

    if (!placeId) {
      return res
        .status(400)
        .json({ error: 'Place ID is required to fetch reviews' });
    }

    if (!isValidObjectId(placeId)) {
      return res.status(400).json({ error: 'Invalid place ID' });
    }

    const reviews = await Review.find({ place: placeId })
      .populate('author', 'displayName')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete('/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req as RequestWithUser;

  if (!isValidObjectId(id) || !id) {
    return res.status(400).json({ error: 'Invalid review ID' });
  }

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    const isAdmin = user.role === 'admin';
    const isAuthor = review.author.toString() === user._id.toString();

    if (!isAdmin && !isAuthor) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
