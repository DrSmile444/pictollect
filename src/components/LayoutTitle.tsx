import { Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';

export const LayoutTitle: FC = () => {
  const title = 'Select a Drive';
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
    </Toolbar>
  );
};
