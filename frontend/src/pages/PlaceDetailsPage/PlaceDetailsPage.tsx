import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  CircularProgress,
  Alert,
  Rating,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { getImage } from '../../utils/getImage.ts';
import {
  selectOnePlace,
  selectPlaceFetchLoading,
} from '../../features/places/placesSlice.ts';
import { fetchOnePlace } from '../../features/places/placesThunks.ts';
import {
  selectReviewsCreateLoading,
  selectReviewsDeleteLoading,
} from '../../features/reviews/reviewsSlice.ts';
import type { ReviewMutation } from '../../types';
import {
  createReview,
  deleteReview,
} from '../../features/reviews/reviewsThunks.ts';
import ReviewsList from '../../containers/ReviewsList/ReviewsList.tsx';
import StarIcon from '@mui/icons-material/Star';
import Gallery from '../../containers/Gallery/Gallery.tsx';
import {
  selectGalleryDeleteLoading,
  selectGalleryItems,
  selectGalleryUploadLoading,
} from '../../features/gallery/gallerySlice.ts';
import {
  deleteImage,
  fetchGallery,
  uploadImages,
} from '../../features/gallery/galleryThunks.ts';

const PlaceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const place = useAppSelector(selectOnePlace);
  const loading = useAppSelector(selectPlaceFetchLoading);

  const createLoading = useAppSelector(selectReviewsCreateLoading);
  const deleteLoading = useAppSelector(selectReviewsDeleteLoading);

  const galleryItems = useAppSelector(selectGalleryItems);
  const uploadLoading = useAppSelector(selectGalleryUploadLoading);
  const galleryDeleteLoading = useAppSelector(selectGalleryDeleteLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOnePlace(id));
      dispatch(fetchGallery(id));
    }
  }, [dispatch, id]);

  const handleReviewSubmit = async (mutation: ReviewMutation) => {
    try {
      if (id) {
        await dispatch(createReview({ ...mutation, placeId: id })).unwrap();
        dispatch(fetchOnePlace(id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    if (id && window.confirm('Are you sure you want to delete this review?')) {
      try {
        await dispatch(deleteReview(reviewId)).unwrap();
        dispatch(fetchOnePlace(id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleGalleryUpload = async (files: File[]) => {
    if (id) {
      await dispatch(uploadImages({ images: files, placeId: id })).unwrap();
    }
  };

  const handleImageDelete = async (imageId: string) => {
    if (window.confirm('Delete this photo?')) {
      await dispatch(deleteImage(imageId)).unwrap();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!place) return <Alert severity="error">Place not found</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 7 },
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
          background: '#ffffff',
        }}
      >
        <Stack sx={{ gap: 6 }}>
          <Stack
            sx={{
              flexDirection: { xs: 'column-reverse', md: 'row' },
              gap: 6,
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1.5 }}>
              <Typography
                variant="h2"
                sx={{ fontWeight: 900, mb: 3, color: '#2D3436' }}
              >
                {place.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8 }}
              >
                {place.description}
              </Typography>
            </Box>

            <Box
              component="img"
              src={getImage(place.mainPhoto)}
              sx={{
                width: { xs: '100%', md: '400px' },
                height: '350px',
                borderRadius: '25px',
                objectFit: 'cover',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              }}
            />
          </Stack>

          <Gallery
            items={galleryItems}
            uploadLoading={uploadLoading}
            deleteLoading={galleryDeleteLoading}
            onUpload={handleGalleryUpload}
            onDelete={handleImageDelete}
          />

          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#2D3436',
                mb: 4,
              }}
            >
              Ratings & Impressions
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 3,
                maxWidth: '900px',
              }}
            >
              {[
                {
                  label: 'Overall Rating',
                  value: place.ratings?.overall || 0,
                  isMain: true,
                },
                {
                  label: 'Quality of food',
                  value: place.ratings?.qualityOfFood || 0,
                  isMain: false,
                },
                {
                  label: 'Service quality',
                  value: place.ratings?.serviceQuality || 0,
                  isMain: false,
                },
                {
                  label: 'Interior',
                  value: place.ratings?.interior || 0,
                  isMain: false,
                },
              ].map((item) => (
                <Paper
                  key={item.label}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '20px',
                    bgcolor: item.isMain
                      ? 'rgba(25, 118, 210, 0.05)'
                      : '#fcfcfc',
                    border: '1px solid',
                    borderColor: item.isMain ? 'primary.light' : '#f1f1f1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: item.isMain ? 'primary.main' : 'text.disabled',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {item.label}
                  </Typography>

                  <Stack
                    sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
                  >
                    <Rating
                      value={item.value}
                      readOnly
                      precision={0.1}
                      sx={{ color: '#faaf00' }}
                      emptyIcon={
                        <StarIcon style={{ opacity: 0.2 }} fontSize="inherit" />
                      }
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: '#2D3436',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {item.value > 0 ? item.value.toFixed(1) : '0.0'}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </Box>

          <ReviewsList
            reviews={place.reviews || []}
            onReviewSubmit={handleReviewSubmit}
            onReviewDelete={handleReviewDelete}
            createLoading={createLoading}
            deleteLoading={deleteLoading}
          />
        </Stack>
      </Paper>
    </Container>
  );
};

export default PlaceDetailsPage;
