import { CheckCircleRounded } from '@mui/icons-material';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import { DateMeta, FileMeta } from 'move-from-sd/src/interfaces';
import React, { FC, useMemo } from 'react';

import { usePhotoContext } from '../context';
import { selectBalancedItems } from '../utils/selectBalancedItems.util';

import { DatePhoto } from './DatePhoto';

export interface DatePhotoGridItemProperties {
  files: FileMeta[] | null;
  dateInfo: DateMeta;
}

export const DatePhotoGridItem: FC<DatePhotoGridItemProperties> = ({ files, dateInfo }) => {
  const gridSize = 3;

  const { dateOfPhotos, setDateOfPhotos, setStep } = usePhotoContext();

  const fileList = useMemo(
    () =>
      selectBalancedItems(
        files.filter((photo) => !photo.isRaw),
        gridSize * gridSize,
      ),
    files,
  );

  const onClick = () => {
    setDateOfPhotos(dateInfo);
    setStep('name');
  };

  const isSelectable = dateOfPhotos?.value === dateInfo.value;

  return (
    <Grid size={{ xs: 12, md: 6 }} sx={{ maxWidth: 400 }} component={Button} onClick={onClick}>
      <Card sx={{ background: isSelectable ? blue[50] : null }}>
        {/* Display Photos (max 4) */}
        <Grid container spacing={0}>
          {fileList.map((photo) => (
            <DatePhoto photo={photo} key={photo.file} gridSize={gridSize} />
          ))}
        </Grid>

        <CardContent>
          {/* Date Title */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{dateInfo.name}</Typography>
            {isSelectable && <CheckCircleRounded />}
          </Stack>
          {/* Total Size of Files */}
          <Typography variant="subtitle1" color="textSecondary">
            Total Size: {dateInfo.value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
