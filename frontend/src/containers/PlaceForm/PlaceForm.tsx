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
    agreement: false,
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.mainPhoto) {
      toast.error('Please upload a main photo!');
      return;
    }

    if (!agreement) {
      setError(true);
      return;
    }

    try {
      await dispatch(createPlace(state)).unwrap();
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
    <Paper
      elevation={3}
      sx={{ p: 4, maxWidth: '600px', mx: 'auto', mt: 4, borderRadius: 3 }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}
      >
        Add New Place
      </Typography>

      <Box component="form" onSubmit={submitFormHandler}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            variant="outlined"
            value={state.title}
            onChange={inputChangeHandler}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            variant="outlined"
            value={state.description}
            onChange={inputChangeHandler}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <FileInput
            label="Main photo"
            name="mainPhoto"
            onChange={fileChangeHandler}
          />

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              By submitting this form, you agree that the following information
              will be submitted to the public domain, and administrators of this
              site will have full control over the said information.
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreement}
                  onChange={(e) => {
                    setAgreement(e.target.checked);
                    setError(false);
                  }}
                  color="primary"
                />
              }
              label="I understand"
            />
            {error && (
              <FormHelperText error>
                You must agree before submitting
              </FormHelperText>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: 3,
              '&:hover': { boxShadow: 5 },
            }}
          >
            {loading ? 'Loading...' : 'Create place'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PlaceForm;
