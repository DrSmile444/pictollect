import { Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { FC } from 'react';

import { DatePhotoGridItem } from './DatePhotoGridItem';

export interface DatePhotoGridProperties {
  fileList: FileList | null;
  isLoading?: boolean;
}

export const DatePhotoGrid: FC<DatePhotoGridProperties> = ({ fileList, isLoading }) => (
  <Grid container spacing={4} justifyContent="center">
    {isLoading &&
      Array.from({ length: 9 }).map((_, index) => (
        <Stack key={index} gap={1} width={400} height={500}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" width={128} height={128} />
            ))}
          </Box>

          <Skeleton variant="rounded" width="100%" height="100%" />
        </Stack>
      ))}

    {!isLoading &&
      fileList?.dates.map((dateInfo, index) => {
        const files = fileList.files.filter((file) => file.fullDate === dateInfo.value);

        return <DatePhotoGridItem files={files} dateInfo={dateInfo} key={index} />;
      })}
  </Grid>
);
