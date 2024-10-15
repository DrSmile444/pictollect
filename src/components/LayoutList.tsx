import {
  AutoAwesomeOutlined,
  CheckRounded,
  ClearRounded,
  ExploreOutlined,
  FolderOutlined,
  GrainRounded,
  RestartAltRounded,
  SdStorageOutlined,
  SettingsSuggestOutlined,
} from '@mui/icons-material';
import { Chip, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import React, { FC } from 'react';

import { usePhotoContext } from '../context';
import { PhotoStep } from '../interfaces';

import { LayoutListItemText } from './LayoutListItemText';
import { LightTooltip } from './LightTooltip';

export const LayoutList: FC = () => {
  const { drive, directory, dateOfPhotos, setStep, step, reset, destination, chooseDestination } = usePhotoContext();

  return (
    <Stack justifyContent="space-between" height="100%">
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DRIVE)} selected={step === PhotoStep.DRIVE}>
            <ListItemIcon>
              <SdStorageOutlined />
            </ListItemIcon>
            <LayoutListItemText title="Drive" icon={<AutoAwesomeOutlined fontSize="small" />} active={!!drive} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DIRECTORY)} selected={step === PhotoStep.DIRECTORY} disabled={!drive}>
            <ListItemIcon>
              <FolderOutlined />
            </ListItemIcon>
            <LayoutListItemText title="Folder" active={!!directory} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.DATE)} selected={step === PhotoStep.DATE} disabled={!directory}>
            <ListItemIcon>
              <GrainRounded />
            </ListItemIcon>
            <LayoutListItemText title="Gallery" active={!!dateOfPhotos} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => setStep(PhotoStep.NAME)} selected={step === PhotoStep.NAME} disabled={!dateOfPhotos}>
            <ListItemIcon>
              <SettingsSuggestOutlined />
            </ListItemIcon>
            <LayoutListItemText title="Details" active={step === PhotoStep.PROGRESS} />
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
          <LightTooltip title={destination} placement="right">
            <ListItemButton onClick={chooseDestination}>
              <ListItemText>
                <Stack direction="row" gap={1}>
                  <Chip
                    label={
                      destination ? (
                        <Stack direction="row" gap={0.5} alignItems="center">
                          Is Set
                          <CheckRounded fontSize="small" />
                        </Stack>
                      ) : (
                        <Stack direction="row" gap={0.5} alignItems="center">
                          Not Set
                          <ClearRounded fontSize="small" />
                        </Stack>
                      )
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
