import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Rating,
  Avatar,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import dayjs from 'dayjs';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import type { Review } from '../../types';

interface Props {
  review: Review;
  onDelete: (id: string) => void;
  deleteLoading: string | false;
}

const ReviewItem: React.FC<Props> = ({ review, onDelete, deleteLoading }) => {
  const user = useAppSelector(selectUser);
  const isDeleting = deleteLoading === review._id;

  const ratings = [
    { label: 'Food', value: review.qualityOfFood },
    { label: 'Service', value: review.serviceQuality },
    { label: 'Interior', value: review.interior },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '20px',
        bgcolor: '#ffffff',
        border: '1px solid #f1f1f1',
        position: 'relative',
        transition: '0.2s',
        '&:hover': { boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
      }}
    >
      {user?.role === 'admin' && (
        <IconButton
          onClick={() => onDelete(review._id)}
          disabled={!!deleteLoading}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            color: 'error.light',
            '&:hover': { color: 'error.main', bgcolor: 'error.light' },
          }}
        >
          {isDeleting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      )}

      <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 700 }}>
          {review.author.displayName[0].toUpperCase()}
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, color: '#2D3436' }}>
            {review.author.displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {dayjs(review.createdAt).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </Box>
      </Stack>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          mb: 3,
          pl: { sm: 8 },
        }}
      >
        "{review.comment}"
      </Typography>

      <Stack
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 4 },
          pt: 2,
          pl: { sm: 8 },
          borderTop: '1px solid #f8f9fa',
        }}
      >
        {ratings.map((r) => (
          <Stack
            key={r.label}
            sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: 'text.disabled' }}
            >
              {r.label}
            </Typography>
            <Rating
              value={r.value}
              readOnly
              size="small"
              sx={{ color: '#faaf00' }}
              emptyIcon={<StarIcon sx={{ opacity: 0.2 }} fontSize="inherit" />}
            />
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
};

export default ReviewItem;
