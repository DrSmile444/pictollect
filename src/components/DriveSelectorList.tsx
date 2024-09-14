import { DynamicFormRounded, SdStorageRounded, StorageRounded } from '@mui/icons-material';
import { Box, LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import prettyBytes from 'pretty-bytes';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';

interface DriveSelectorListProperties {
  onSelect: (drive: Drive) => void;
  drives: Drive[];
}

export const DriveSelectorList: FC<DriveSelectorListProperties> = ({ onSelect, drives }) => {
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

  const handleListItemClick = (drive: Drive) => {
    setSelectedDrive(drive);
    onSelect(drive);
  };

  const icons: Record<Drive['driveType'], React.ReactElement> = {
    local: <StorageRounded />,
    removable: <SdStorageRounded />,
    unknown: <DynamicFormRounded />,
  };

  // We need to create auto select of first removable drive
  useEffect(() => {
    const removableDrive = drives.find((drive) => drive.driveType === 'removable');
    if (removableDrive) {
      handleListItemClick(removableDrive);
    }
  }, [drives]);

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {drives.map((drive) => (
          <ListItemButton key={drive.drive} selected={selectedDrive === drive} onClick={() => handleListItemClick(drive)}>
            <ListItemIcon>{icons[drive.driveType]}</ListItemIcon>
            <ListItemText
              primary={drive.drive + ' ' + drive.name}
              secondary={
                <Stack gap={1}>
                  <LinearProgress variant="determinate" value={100 - (drive.freeSpace / drive.size) * 100} />
                  <Typography variant="body2">
                    {prettyBytes(drive.freeSpace)} free of {prettyBytes(drive.size)}
                  </Typography>
                </Stack>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
