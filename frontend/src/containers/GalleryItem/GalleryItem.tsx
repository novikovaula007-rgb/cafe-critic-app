import React from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImage } from '../../utils/getImage';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';

interface Props {
  image: string;
  imageId: string;
  onDelete: (id: string) => void;
  deleteLoading: string | false;
}

const GalleryItem: React.FC<Props> = ({
  image,
  imageId,
  onDelete,
  deleteLoading,
}) => {
  const user = useAppSelector(selectUser);
  const isDeleting = deleteLoading === imageId;

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'transform 0.3s ease',
        borderRadius: '25px',
        objectFit: 'cover',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      <Box
        component="img"
        src={getImage(image)}
        sx={{
          transition: 'transform 0.3s ease',
          height: '200px',
          width: '200px',
          borderRadius: '25px',
          objectFit: 'cover',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        }}
      />
      {user?.role === 'admin' && (
        <IconButton
          className="delete-btn"
          onClick={(e) => {
            e.preventDefault();
            onDelete(imageId);
          }}
          disabled={!!deleteLoading}
          sx={{
            position: 'absolute',
            zIndex: 20,
            right: '10px',
            top: '10px',
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
    </Box>
  );
};

export default GalleryItem;
