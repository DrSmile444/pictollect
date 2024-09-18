import { ImageNotSupported } from '@mui/icons-material';
import { CardMedia, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React, { FC, useEffect, useState } from 'react';

import { FileMeta } from '../../../move-from-sd/src/interfaces';
import { useOs } from '../hooks';

export interface DatePhotoProperties {
  photo: FileMeta;
}

export const DatePhoto: FC<DatePhotoProperties> = ({ photo }) => {
  const { loadImage } = useOs();
  const [path, setPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadImage(photo.file)
      .then((imagePath) => setPath(imagePath))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Grid size={{ xs: 6 }}>
      {isLoading && <Skeleton variant="rounded" width="100%" height={140} />}
      {!isLoading && !!path && <CardMedia component="img" height="140" image={path} alt={photo.file} />}
      {!isLoading && !path && (
        <Stack height={140} width="100%" alignItems="center" justifyContent="center">
          <ImageNotSupported />
        </Stack>
      )}
    </Grid>
  );
};
