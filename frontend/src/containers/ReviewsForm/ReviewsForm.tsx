import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Rating,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import type { ReviewMutation } from '../../types';
import { toast } from 'react-toastify';

interface Props {
  onSubmit: (mutation: ReviewMutation) => void;
  loading: boolean;
}

const ReviewForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [state, setState] = useState<ReviewMutation>({
    comment: '',
    qualityOfFood: 5,
    serviceQuality: 5,
    interior: 5,
  });

  const ratingChangeHandler = (name: string, value: number | null) => {
    setState((prev) => ({ ...prev, [name]: value || 1 }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    if (!state.comment) {
      toast.error('You have not filled in all the required fields.');
      return;
    }

    setState({
      comment: '',
      qualityOfFood: 5,
      serviceQuality: 5,
      interior: 5,
    });
  };

  return (
    <Box component="form" onSubmit={submitHandler}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: '#2D3436',
          mb: 3,
        }}
      >
        Leave a Review
      </Typography>

      <Stack sx={{ gap: 4 }}>
        <Stack
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 6 },
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'Quality of food', name: 'qualityOfFood' },
            { label: 'Service quality', name: 'serviceQuality' },
            { label: 'Interior', name: 'interior' },
          ].map((item) => (
            <Box key={item.name} sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 1,
                }}
              >
                {item.label}
              </Typography>
              <Rating
                name={item.name}
                value={state[item.name as keyof ReviewMutation] as number}
                precision={1}
                onChange={(_, newValue) =>
                  ratingChangeHandler(item.name, newValue)
                }
                emptyIcon={
                  <StarIcon sx={{ opacity: 0.2 }} fontSize="inherit" />
                }
                sx={{ color: '#faaf00' }}
              />
            </Box>
          ))}
        </Stack>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Your experience"
          name="comment"
          value={state.comment}
          onChange={inputChangeHandler}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              backgroundColor: '#fff',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            alignSelf: 'flex-start',
            py: 1.5,
            px: 6,
            borderRadius: '12px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              boxShadow: '0 12px 20px rgba(25, 118, 210, 0.3)',
            },
          }}
        >
          {loading ? 'Posting...' : 'Post Review'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
