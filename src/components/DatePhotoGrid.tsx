import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

import { DatePhoto } from './DatePhoto';

export interface DatePhotoGridProperties {
  fileList: FileList | null;
}

export const DatePhotoGrid: FC<DatePhotoGridProperties> = ({ fileList }) => {
  const loadImage = async (photoPath: string) => window.electron.getImagePath(photoPath);

  return (
    <Grid container spacing={4}>
      {fileList?.dates.map((dateInfo, index) => {
        const files = fileList.files.filter((file) => file.fullDate === dateInfo.value);

        return (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card>
              {/* Display Photos (max 4) */}
              <Grid container spacing={0}>
                {files.slice(0, 4).map((photo) => (
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
      })}
    </Grid>
  );
};
