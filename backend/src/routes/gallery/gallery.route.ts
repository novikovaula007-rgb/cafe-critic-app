import { Router } from 'express';
import auth, { RequestWithUser } from '../../middlewares/auth';
import { imagesUpload } from '../../middlewares/multer';
import { isValidObjectId } from 'mongoose';
import { Image } from '../../models/image/Image';
import permit from '../../middlewares/permit';

const galleryRouter = Router();

galleryRouter.post(
  '/:id',
  auth,
  imagesUpload.array('images', 10),
  async (req, res, next) => {
    const { id } = req.params;
    const { user } = req as RequestWithUser;

    if (!isValidObjectId(id) || !id) {
      return res.status(400).json({ error: 'Invalid place ID' });
    }

    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No images provided' });
      }

      const imageData = files.map((file) => ({
        url: file.filename,
        place: id,
        user: user._id,
      }));

      const savedImages = await Image.insertMany(imageData);

      res.json(savedImages);
    } catch (error) {
      next(error);
    }
  },
);

galleryRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id) || !id) {
    return res.status(400).json({ error: 'Invalid image ID' });
  }

  try {
    await Image.findByIdAndDelete(id);
    res.send({ message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default galleryRouter;
