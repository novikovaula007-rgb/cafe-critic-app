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
    <>
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
          '&:hover': { transform: 'scale(1.05)' },
        }}
      />

      {user?.role === 'admin' && (
        <IconButton
          className="delete-btn"
          onClick={() => onDelete(imageId)}
          disabled={!!deleteLoading}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            color: 'error.main',
            opacity: 0,
            transition: 'opacity 0.2s',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          {isDeleting ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </>
  );
};

export default GalleryItem;
