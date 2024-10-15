import { Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useLayoutContext } from '../context';

export const LayoutTitle: FC = () => {
  const { title } = useLayoutContext();

  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
    </Toolbar>
  );
};
