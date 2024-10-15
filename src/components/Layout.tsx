import {
  CheckRounded,
  ExploreOutlined,
  FolderOutlined,
  GrainRounded,
  PartyMode,
  RestartAltRounded,
  SdStorageOutlined,
  SettingsSuggestOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import * as React from 'react';
import { FC } from 'react';

const drawerWidth = 240;

export interface LayoutProperties {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProperties> = ({ children }) => {
  const title = 'Select a Drive';

  return (
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
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
        </Toolbar>
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
        <Divider />
        <Stack justifyContent="space-between" height="100%">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SdStorageOutlined />
                </ListItemIcon>
                <ListItemText primary="Drive" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FolderOutlined />
                </ListItemIcon>
                <ListItemText primary="Folder" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GrainRounded />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsSuggestOutlined />
                </ListItemIcon>
                <ListItemText primary="Details" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemText>
                <Divider />
              </ListItemText>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <RestartAltRounded />
                </ListItemIcon>
                <ListItemText primary="Reset" />
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreOutlined />
                </ListItemIcon>
                <ListItemText primary="Storage Folder" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>
                  <Stack direction="row" gap={1}>
                    <Chip
                      label={
                        <Stack direction="row" gap={0.5} alignItems="center">
                          Is Set
                          <CheckRounded fontSize="small" />
                        </Stack>
                      }
                      sx={{ background: '#121212', color: '#fff', borderRadius: 1.5 }}
                    />
                    <Chip
                      label="/Users/user/Documents/fromsd"
                      sx={{
                        borderRadius: 1.5,
                        width: '100%',
                        overflow: 'hidden',
                        direction: 'rtl',
                        whiteSpace: 'nowrap',
                      }}
                      variant="outlined"
                    />
                  </Stack>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};
