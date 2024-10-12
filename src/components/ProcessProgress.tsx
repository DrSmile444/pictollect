import { DeleteRounded, FileCopyRounded, MoveDownRounded } from '@mui/icons-material';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { LinearProgressProps } from '@mui/material/LinearProgress/LinearProgress';
import prettyMilliseconds from 'pretty-ms';
import React, { FC } from 'react';

import { OperationType, ProcessCallbackProgress } from '../interfaces';

export interface ProcessProgressProperties {
  info: ProcessCallbackProgress;
  totalFiles: number;
  type: OperationType;
}

export const ProcessProgress: FC<ProcessProgressProperties> = ({ info, totalFiles, type }) => {
  const percentage = (info.processedCount / totalFiles) * 100;
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

  const operationIcons: Record<OperationType, React.ReactNode> = {
    [OperationType.COPY]: <FileCopyRounded />,
    [OperationType.MOVE]: <MoveDownRounded />,
    [OperationType.DELETE]: <DeleteRounded />,
  };

  return (
    <Stack gap={1} sx={{ width: 400, alignSelf: 'center' }}>
      <Typography variant="subtitle2" color="textSecondary">
        {operationTitles[type]} {totalFiles} files
      </Typography>

      <Stack direction="row" gap={2} alignItems="center">
        {operationIcons[type]}
        <Typography variant="h5">{percentage.toFixed(0)}% complete</Typography>
      </Stack>

      <LinearProgress variant="determinate" color={operationColors[type]} value={percentage} sx={{ height: 16, borderRadius: 12 }} />

      <Stack>
        <Typography variant="subtitle2" color="textSecondary">
          Estimated {prettyMilliseconds(info.eta)} remaining...
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {info.remainingFiles.toLocaleString()} files remaining
        </Typography>
      </Stack>
    </Stack>
  );
};
