import {
  ImageNotSupported,
  ImageRounded,
  RawOn,
  VideoCall,
  VideoCameraBackRounded,
  VideoCameraFrontRounded,
} from '@mui/icons-material';
import { CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FileMeta } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

import { useOs } from '../hooks';

export interface DatePhotoProperties {
  photo: FileMeta;
  gridSize: number;
}

export const DatePhoto: FC<DatePhotoProperties> = ({ photo, gridSize }) => {
  const { loadImage } = useOs();
  const [path, setPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const height = 400 / gridSize;

  useEffect(() => {
    setIsLoading(true);
    loadImage(photo.file)
      .then((imagePath) => setPath(imagePath))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Grid size={{ xs: 12 / gridSize }} sx={{ maxWidth: height, position: 'relative' }}>
      {isLoading && <Skeleton variant="rounded" width="100%" height={height} />}
      {!isLoading && !!path && <CardMedia component="img" height={height} image={path} alt={photo.file} />}
      {!isLoading && !path && (
        <Stack height={height} width="100%" alignItems="center" justifyContent="center">
          <ImageNotSupported />
        </Stack>
      )}
      <Box sx={{ position: 'absolute', right: 4, top: 4 }}>
        <Stack sx={{ color: '#fff' }} alignItems="center" direction="row">
          {photo.hasRelatedJpg && <ImageRounded fontSize="small" />}
          {photo.hasRawPhoto && <RawOn />}
          {photo.isVideo && <VideoCameraFrontRounded />}
        </Stack>
      </Box>
    </Grid>
  );
};
