import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

export interface DetailRowProperties {
  label: string;
  value: string;
}

export const DetailRow: FC<DetailRowProperties> = ({ label, value }) => (
  <Stack>
    <Typography variant="body1" typography="body1" sx={{ fontWeight: 'bold' }}>
      {label}
    </Typography>
    <Typography variant="body1" typography="body1">
      {value || '—'}
    </Typography>
  </Stack>
);
