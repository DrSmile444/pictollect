import { Stack, SxProps, Typography } from '@mui/material';
import React, { FC } from 'react';

export interface EmptyStateProperties {
  icon: React.ReactElement;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
  sx?: SxProps;
}

export const EmptyState: FC<EmptyStateProperties> = ({ icon, title, description, sx }) => (
  <Stack gap={1} alignItems="center" justifyContent="center" padding={1} sx={sx}>
    <Stack gap={1} alignItems="center" maxWidth={400}>
      <Stack gap={1} direction="row" alignItems="center" justifyContent="center">
        {icon}
        <Typography variant="h5" color="#999">
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1" align="center" color="#999">
        {description}
      </Typography>
    </Stack>
  </Stack>
);
