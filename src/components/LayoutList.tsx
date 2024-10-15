import {
  CheckRounded,
  ExploreOutlined,
  FolderOutlined,
  GrainRounded,
  RestartAltRounded,
  SdStorageOutlined,
  SettingsSuggestOutlined,
} from '@mui/icons-material';
import { Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip } from '@mui/material';
import React, { FC } from 'react';

import { usePhotoContext } from '../context';
import { PhotoStep } from '../interfaces';

import { LightTooltip } from './LightTooltip';

export const LayoutList: FC = () => {
  const { drive, directory, dateOfPhotos, setStep, reset, destination, chooseDestination } = usePhotoContext();

  return (
    <Stack justifyContent="space-between" height="100%">
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DRIVE)}>
            <ListItemIcon>
              <SdStorageOutlined />
            </ListItemIcon>
            <ListItemText primary="Drive" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DIRECTORY)} disabled={!drive}>
            <ListItemIcon>
              <FolderOutlined />
            </ListItemIcon>
            <ListItemText primary="Folder" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DATE)} disabled={!directory}>
            <ListItemIcon>
              <GrainRounded />
            </ListItemIcon>
            <ListItemText primary="Gallery" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.NAME)} disabled={!dateOfPhotos}>
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
          <ListItemButton onClick={() => reset()}>
            <ListItemIcon>
              <RestartAltRounded />
            </ListItemIcon>
            <ListItemText primary="Reset" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={chooseDestination}>
            <ListItemIcon>
              <ExploreOutlined />
            </ListItemIcon>
            <ListItemText primary="Storage Folder" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <LightTooltip title={destination}>
            <ListItemButton onClick={chooseDestination}>
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
                    label={destination}
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
          </LightTooltip>
        </ListItem>
      </List>
    </Stack>
  );
};
