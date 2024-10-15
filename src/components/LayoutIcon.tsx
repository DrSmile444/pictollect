import { PartyMode } from '@mui/icons-material';
import { Stack, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC } from 'react';

export const LayoutIcon: FC = () => (
  <Toolbar sx={{ paddingInline: '16px !important' }}>
    <Stack direction="row" gap={2} alignItems="center">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#121212',
          padding: 0.5,
          color: '#fff',
          borderRadius: 1.5,
        }}
      >
        <PartyMode />
      </Box>
      <Typography variant="h6">Pictollect</Typography>
    </Stack>
  </Toolbar>
);
