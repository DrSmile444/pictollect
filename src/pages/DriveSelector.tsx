// DriveSelector.tsx
import { Button, Stack, Typography } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

import { DriveSelectorList } from '../components';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const DriveSelector: FC = () => {
  const [drives, setDrives] = useState<Drive[]>([]);

  const { setDrive, drive, setDirectory, setStep } = usePhotoContext();

  const { fetchDrives } = useOs();

  useEffect(() => {
    // Fetch drives when the component mounts
    fetchDrives().then(setDrives).catch(console.error);
  }, []);

  const handleSelectChange = (drive: Drive) => {
    setDrive(drive);
    setDirectory(null);
  };

  const handleNextClick = () => {
    setStep('directory');
  };

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Drive
      </Typography>
      <DriveSelectorList onSelect={handleSelectChange} drives={drives} drive={drive} />
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="contained" color="primary" disabled={!drive} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
