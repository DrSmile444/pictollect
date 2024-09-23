import Grid from '@mui/material/Grid2';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { FC } from 'react';

import { DatePhotoGridItem } from './DatePhotoGridItem';

export interface DatePhotoGridProperties {
  fileList: FileList | null;
}

export const DatePhotoGrid: FC<DatePhotoGridProperties> = ({ fileList }) => (
  <Grid container spacing={4}>
    {fileList?.dates.map((dateInfo, index) => {
      const files = fileList.files.filter((file) => file.fullDate === dateInfo.value);

      return <DatePhotoGridItem files={files} dateInfo={dateInfo} key={index} />;
    })}
  </Grid>
);
