import { AppBar, Divider, Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { FC } from 'react';

import { LayoutIcon } from './LayoutIcon';
import { LayoutList } from './LayoutList';
import { LayoutTitle } from './LayoutTitle';

const drawerWidth = 240;

export interface LayoutProperties {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProperties> = ({ children }) => (
  <Box sx={{ display: 'flex', padding: 1 }}>
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <LayoutTitle />
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <LayoutIcon />
      <Divider />
      <LayoutList />
    </Drawer>
    <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      {children}
    </Box>
  </Box>
);
