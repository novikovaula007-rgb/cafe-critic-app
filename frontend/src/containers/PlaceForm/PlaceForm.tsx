import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Container,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { PlaceMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import FileInput from '../FileInput/FileInput.tsx';
import { selectPlacesCreateLoading } from '../../features/places/placesSlice.ts';
import { createPlace } from '../../features/places/placesThunks.ts';
import { toast } from 'react-toastify';

const PlaceForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectPlacesCreateLoading);

  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState(false);

  const [state, setState] = useState<PlaceMutation>({
    title: '',
    description: '',
    mainPhoto: null,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.mainPhoto || !state.title || !state.description) {
      toast.error('You have not filled in all the required fields.');
      return;
    }

    if (!agreement) {
      setError(true);
      return;
    }

    try {
      await dispatch(createPlace({ ...state, agreement })).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 4 },
          borderRadius: '30px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 800,
            textAlign: 'center',
            color: '#2D3436',
            letterSpacing: '-0.02em',
          }}
        >
          Add New Place
        </Typography>

        <Box component="form" onSubmit={submitFormHandler}>
          <Stack sx={{ gap: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={state.title}
              onChange={inputChangeHandler}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                },
              }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Description"
              name="description"
              value={state.description}
              onChange={inputChangeHandler}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                },
              }}
            />

            <FileInput
              label="Main photo"
              name="mainPhoto"
              onChange={fileChangeHandler}
            />

            <Box
              sx={{
                p: 2.5,
                borderRadius: '18px',
                backgroundColor: error
                  ? 'rgba(211, 47, 47, 0.04)'
                  : 'rgba(0, 0, 0, 0.02)',
                border: '1px solid',
                borderColor: error ? 'error.light' : 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1.5,
                  lineHeight: 1.5,
                  fontSize: '0.85rem',
                }}
              >
                By submitting this form, you agree that this information will be
                submitted to the public domain, and administrators will have
                full control over it.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreement}
                    onChange={(e) => {
                      setAgreement(e.target.checked);
                      setError(false);
                    }}
                    sx={{
                      color: error ? 'error.main' : 'primary.main',
                      '&.Mui-checked': { color: 'primary.main' },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    I understand and agree
                  </Typography>
                }
              />
              {error && (
                <FormHelperText error sx={{ ml: 1, fontWeight: 500 }}>
                  You must agree before submitting
                </FormHelperText>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 700,
              }}
            >
              {loading ? 'Loading...' : 'Create place'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default PlaceForm;
