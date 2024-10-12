import { ErrorRounded } from '@mui/icons-material';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';
import prettyMilliseconds from 'pretty-ms';
import React, { FC } from 'react';

import { OperationType, ProcessCallbackError } from '../interfaces';

export interface ProcessErrorProperties {
  info: ProcessCallbackError;
  totalFiles: number;
  type: OperationType;
}

export const ProcessError: FC<ProcessErrorProperties> = ({ info, totalFiles, type }) => {
  const operationTitles: Record<OperationType, string> = {
    [OperationType.COPY]: 'Copying',
    [OperationType.MOVE]: 'Moving',
    [OperationType.DELETE]: 'Deleting',
  };

  return (
    <Stack gap={1} sx={{ width: 400, alignSelf: 'center' }}>
      <Typography variant="subtitle2" color="textSecondary">
        {operationTitles[type]} {totalFiles} files
      </Typography>

      <Stack direction="row" gap={2} alignItems="center">
        <ErrorRounded />
        <Typography variant="h5">Error while {operationTitles[type].toLowerCase()} files</Typography>
      </Stack>

      <LinearProgress variant="buffer" color="error" value={10} valueBuffer={30} sx={{ height: 16, borderRadius: 12 }} />

      <Stack>
        <Typography variant="subtitle2" color="textSecondary">
          {info.error}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          File with error: {info.sourcePath}
        </Typography>
      </Stack>
    </Stack>
  );
};
