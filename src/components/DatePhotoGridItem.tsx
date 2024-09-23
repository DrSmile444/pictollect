import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DateMeta, FileMeta } from 'move-from-sd/src/interfaces';
import React, { FC } from 'react';

import { DatePhoto } from './DatePhoto';

export interface DatePhotoGridItemProperties {
  files: FileMeta[] | null;
  dateInfo: DateMeta;
}

export const DatePhotoGridItem: FC<DatePhotoGridItemProperties> = ({ files, dateInfo }) => {
  const fileList = files.filter((photo) => !photo.isRaw).slice(0, 4);

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        {/* Display Photos (max 4) */}
        <Grid container spacing={0}>
          {fileList.map((photo) => (
            <DatePhoto photo={photo} key={photo.file} />
          ))}
        </Grid>

        <CardContent>
          {/* Date Title */}
          <Typography variant="h6">{dateInfo.name}</Typography>
          {/* Total Size of Files */}
          <Typography variant="subtitle1" color="textSecondary">
            Total Size: {dateInfo.value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
