import React from 'react';
import { Box, Typography, Stack, Divider, Paper } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import type { Review, ReviewMutation } from '../../types';
import ReviewItem from '../ReviewItem/ReviewItem.tsx';
import ReviewForm from '../ReviewsForm/ReviewsForm.tsx';

interface Props {
  reviews: Review[];
  onReviewSubmit: (mutation: ReviewMutation) => void;
  onReviewDelete: (id: string) => void;
  createLoading: boolean;
  deleteLoading: string | false;
}

const ReviewsList: React.FC<Props> = ({
  reviews,
  onReviewSubmit,
  onReviewDelete,
  createLoading,
  deleteLoading,
}) => {
  const user = useAppSelector(selectUser);

  const isAlreadyReviewed =
    user &&
    reviews.some((review) => {
      const authorId =
        typeof review.author === 'object' ? review.author._id : review.author;
      return authorId === user._id;
    });

  return (
    <Stack sx={{ gap: 6, mt: 2 }}>
      <Divider sx={{ opacity: 0.5 }} />

      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: '#2D3436', mb: 4 }}
        >
          Reviews ({reviews.length})
        </Typography>

        {reviews.length === 0 ? (
          <Typography
            sx={{
              color: 'text.disabled',
              textAlign: 'center',
              py: 4,
            }}
          >
            No reviews yet. Be the first to rate this place!
          </Typography>
        ) : (
          <Stack sx={{ gap: 3 }}>
            {reviews.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                onDelete={onReviewDelete}
                deleteLoading={deleteLoading}
              />
            ))}
          </Stack>
        )}
      </Box>

      {user ? (
        !isAlreadyReviewed ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              bgcolor: '#fbfbfb',
              borderRadius: '25px',
              border: '1px solid #f1f1f1',
            }}
          >
            <ReviewForm onSubmit={onReviewSubmit} loading={createLoading} />
          </Paper>
        ) : (
          <Box
            sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: 'rgba(76, 175, 80, 0.05)',
              borderRadius: '20px',
              border: '1px dashed',
              borderColor: 'success.light',
            }}
          >
            <Typography sx={{ color: 'success.main', fontWeight: 600 }}>
              You have already shared your review for this place. Thank you!
            </Typography>
          </Box>
        )
      ) : (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: '#f5f5f5',
            borderRadius: '20px',
          }}
        >
          <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Log in to share your experience and rate this place.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default ReviewsList;
