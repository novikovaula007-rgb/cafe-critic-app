import React, { useState } from 'react';
import { Box, Typography, Stack, Button, Paper } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileInput from '../FileInput/FileInput';
import type { GalleryImage } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import GalleryItem from '../GalleryItem/GalleryItem.tsx';

interface Props {
  items: GalleryImage[];
  uploadLoading: boolean;
  deleteLoading: string | false;
  onUpload: (files: File[]) => void;
  onDelete: (id: string) => void;
}

const Gallery: React.FC<Props> = ({
  items,
  uploadLoading,
  deleteLoading,
  onUpload,
  onDelete,
}) => {
  const user = useAppSelector(selectUser);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 10);
      setSelectedFiles(filesArray);
    }
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  return (
    <Stack sx={{ gap: 4, mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D3436' }}>
        Gallery
      </Typography>

      {items.length === 0 && (
        <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
          No photos in the gallery yet.
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {items.map((item) => (
          <Box key={item._id}>
            <GalleryItem
              image={item.url}
              imageId={item._id}
              onDelete={onDelete}
              deleteLoading={deleteLoading}
            />
          </Box>
        ))}
      </Box>

      {user && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: '25px',
            bgcolor: '#fbfbfb',
          }}
        >
          <Stack
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1, width: '100%' }}>
              <FileInput
                label="Add photos"
                name="galleryImages"
                multiple
                onChange={fileChangeHandler}
              />
            </Box>
            <Button
              variant="contained"
              disabled={uploadLoading || selectedFiles.length === 0}
              onClick={handleUploadClick}
              startIcon={<AddPhotoAlternateIcon />}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '15px',
                textTransform: 'none',
                fontWeight: 700,
              }}
            >
              {uploadLoading ? 'Uploading...' : 'Upload Gallery'}
            </Button>
          </Stack>
        </Paper>
      )}
    </Stack>
  );
};

export default Gallery;
