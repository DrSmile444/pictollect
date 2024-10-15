import {
  DynamicFormOutlined,
  DynamicFormRounded,
  FolderOffOutlined,
  SdStorageOutlined,
  SdStorageRounded,
  StorageOutlined,
  StorageRounded,
} from '@mui/icons-material';
import { Box, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import prettyBytes from 'pretty-bytes';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import { EmptyState } from './EmptyState';

interface DriveSelectorListProperties {
  onSelect: (drive: Drive) => void;
  onDoubleSelect: (drive: Drive) => void;
  drives: Drive[];
  drive: Drive | null;
  hasPrevious: boolean | null;
}

export const DriveSelectorList: FC<DriveSelectorListProperties> = ({ onSelect, onDoubleSelect, drives, drive, hasPrevious }) => {
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(drive || null);

  const handleListItemClick = (drive: Drive) => {
    setSelectedDrive(drive);
    onSelect(drive);
  };

  const handleListItemDoubleClick = (drive: Drive) => {
    setSelectedDrive(drive);
    onDoubleSelect(drive);
  };

  const iconsSelected: Record<Drive['driveType'], React.ReactElement> = {
    local: <StorageRounded />,
    removable: <SdStorageRounded />,
    unknown: <DynamicFormRounded />,
  };

  const icons: Record<Drive['driveType'], React.ReactElement> = {
    local: <StorageOutlined />,
    removable: <SdStorageOutlined />,
    unknown: <DynamicFormOutlined />,
  };

  // We need to create auto select of first removable drive
  useEffect(() => {
    if (selectedDrive || hasPrevious === null) {
      return;
    }

    const removableDrive = drives.find((drive) => drive.driveType === 'removable');
    if (removableDrive) {
      handleListItemClick(removableDrive);
    }
  }, [drives, selectedDrive, hasPrevious]);

  useEffect(() => {
    setSelectedDrive(drive);
  }, [drive]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {drives.length === 0 && (
          <EmptyState
            icon={<FolderOffOutlined />}
            title="No devices"
            description={
              <>
                The list of available storage devices are empty.
                <br />
                Please, connect a storage device or SD card and reload the application.
              </>
            }
          />
        )}

        {drives.map((drive) => {
          const isSelected = selectedDrive?.drive === drive.drive;
          const icon = isSelected ? iconsSelected[drive.driveType] : icons[drive.driveType];

          return (
            <ListItemButton
              key={drive.drive}
              selected={isSelected}
              onClick={() => handleListItemClick(drive)}
              onDoubleClick={() => handleListItemDoubleClick(drive)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <Stack gap={1} direction="column" width={1}>
                <ListItemText primary={drive.drive + ' ' + drive.name} />
                <Stack gap={1}>
                  <LinearProgress variant="determinate" value={100 - (drive.freeSpace / drive.size) * 100} />
                  <Typography variant="body2">
                    {prettyBytes(drive.freeSpace)} free of {prettyBytes(drive.size)}
                  </Typography>
                </Stack>
              </Stack>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};
