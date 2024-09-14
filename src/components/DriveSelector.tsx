// DriveSelector.tsx
import { Button, Stack } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import React, { useEffect, useState } from 'react';

import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

import { DriveSelectorList } from './DriveSelectorList';

interface DriveSelectorProperties {}

export const DriveSelector: React.FC<DriveSelectorProperties> = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

  const { setDrive, setStep } = usePhotoContext();

  const { fetchDrives } = useOs();

  useEffect(() => {
    // Fetch drives when the component mounts
    fetchDrives().then(setDrives).catch(console.error);
  }, []);

  const handleSelectChange = (drive: Drive) => {
    setSelectedDrive(drive);
    setDrive(drive);
  };

  const handleNextClick = () => {
    setStep('directory');
  };

  return (
    <Stack gap={2}>
      <h1>Select a Drive</h1>
      <DriveSelectorList onSelect={handleSelectChange} drives={drives} />
      <Button variant="contained" color="primary" disabled={!selectedDrive} onClick={handleNextClick}>
        Next
      </Button>
    </Stack>
  );
};
