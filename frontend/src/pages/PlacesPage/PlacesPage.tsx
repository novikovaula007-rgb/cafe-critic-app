import { useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deletePlace,
  fetchPlaces,
} from '../../features/places/placesThunks.ts';
import {
  selectPlaces,
  selectPlacesFetchLoading,
} from '../../features/places/placesSlice.ts';
import PlaceCard from '../../containers/PlaceCard/PlaceCard.tsx';

const PlacesPage = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectPlaces);
  const loading = useAppSelector(selectPlacesFetchLoading);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      await dispatch(deletePlace(id));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Recommended Places
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {places.map((place) => (
          <PlaceCard
            key={place._id}
            id={place._id}
            title={place.title}
            description={place.description}
            mainPhoto={place.mainPhoto}
            overallRating={place.overallRating || 0}
            reviewsCount={place.reviewsCount || 0}
            photosCount={place.photosCount || 0}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Container>
  );
};

export default PlacesPage;
