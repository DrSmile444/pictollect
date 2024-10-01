import { ImageNotSupported } from '@mui/icons-material';
import { CardMedia, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React, { FC, useEffect, useState } from 'react';

import { FileMeta } from '../../../move-from-sd/src/interfaces';
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
    <Grid size={{ xs: 12 / gridSize }} sx={{ maxWidth: height }}>
      {isLoading && <Skeleton variant="rounded" width="100%" height={height} />}
      {!isLoading && !!path && <CardMedia component="img" height={height} image={path} alt={photo.file} />}
      {!isLoading && !path && (
        <Stack height={height} width="100%" alignItems="center" justifyContent="center">
          <ImageNotSupported />
        </Stack>
      )}
    </Grid>
  );
};
