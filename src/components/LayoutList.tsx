import {
  CheckRounded,
  ExploreOutlined,
  FolderOutlined,
  GrainRounded,
  RestartAltRounded,
  SdStorageOutlined,
  SettingsSuggestOutlined,
} from '@mui/icons-material';
import { Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import React, { FC } from 'react';

export const LayoutList: FC = () => {
  const a = 1;
  return (
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
  );
};
