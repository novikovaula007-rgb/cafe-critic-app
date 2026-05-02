import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Rating,
  CardActionArea,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { selectPlacesDeleteLoading } from '../../features/places/placesSlice';
import { getImage } from '../../utils/getImage.ts';

interface Props {
  id: string;
  title: string;
  description: string;
  mainPhoto: string | null;
  overallRating: number;
  reviewsCount: number;
  photosCount: number;
  onDelete: (id: string) => void;
}

const PlaceCard: React.FC<Props> = ({
  id,
  title,
  description,
  mainPhoto,
  overallRating,
  reviewsCount,
  photosCount,
  onDelete,
}) => {
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectPlacesDeleteLoading);

  const isDeleting = deleteLoading === id;
  const imagePath = getImage(mainPhoto);

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      {user?.role === 'admin' && (
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            onDelete(id);
          }}
          disabled={!!deleteLoading}
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            color: 'error.light',
            transition: '0.2s',
            '&:hover': {
              backgroundColor: 'error.main',
              color: 'white',
            },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {isDeleting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      )}

      <CardActionArea
        component={Link}
        to={`/places/${id}`}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="220"
            image={imagePath}
            alt={title}
            sx={{
              objectFit: 'cover',
              filter: 'brightness(0.95)',
            }}
          />
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              px: 1.2,
              py: 0.5,
              borderRadius: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              alignItems: 'center',
            }}
          >
            <ImageIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
              {photosCount}
            </Typography>
          </Stack>
        </Box>

        <CardContent sx={{ p: 3, flexGrow: 1 }}>
          <Stack spacing={1.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#2D3436',
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '3em',
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', pt: 1 }}
            >
              <Rating
                value={overallRating}
                readOnly
                precision={0.5}
                size="small"
                sx={{ color: '#FFD700' }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: '#2D3436' }}
              >
                {overallRating > 0 ? overallRating.toFixed(1) : '0.0'}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', fontWeight: 600 }}
              >
                ({reviewsCount} reviews)
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlaceCard;
