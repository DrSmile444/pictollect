import { DoneAllRounded } from '@mui/icons-material';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';
import prettyMilliseconds from 'pretty-ms';
import React, { FC } from 'react';

import { OperationType, ProcessCallbackEnd } from '../interfaces';

export interface ProcessEndProperties {
  info: ProcessCallbackEnd;
  totalFiles: number;
  type: OperationType;
}

export const ProcessEnd: FC<ProcessEndProperties> = ({ info, totalFiles, type }) => {
  const operationTitles: Record<OperationType, string> = {
    [OperationType.COPY]: 'Copying',
    [OperationType.MOVE]: 'Moving',
    [OperationType.DELETE]: 'Deleting',
  };

  const operationColors: Record<OperationType, LinearProgressProps['color']> = {
    [OperationType.COPY]: 'success',
    [OperationType.MOVE]: 'warning',
    [OperationType.DELETE]: 'error',
  };

  return (
    <Stack gap={1} sx={{ width: 400, alignSelf: 'center' }}>
      <Typography variant="subtitle2" color="textSecondary">
        {operationTitles[type]} {totalFiles} files
      </Typography>

      <Stack direction="row" gap={2} alignItems="center">
        <DoneAllRounded />
        <Typography variant="h5">{totalFiles} files are successfully processed!</Typography>
      </Stack>

      <LinearProgress variant="buffer" color={operationColors[type]} value={100} sx={{ height: 16, borderRadius: 12 }} />

      <Stack>
        <Typography variant="subtitle2" color="textSecondary">
          {operationTitles[type]} took {prettyMilliseconds(info.elapsedTime)} seconds
        </Typography>
      </Stack>
    </Stack>
  );
};
