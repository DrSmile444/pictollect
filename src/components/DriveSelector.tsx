// DriveSelector.tsx
import { Button, Stack } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import React, { useEffect, useState } from 'react';

import { DriveSelectorList } from './DriveSelectorList';

interface DriveSelectorProperties {
  onSelect: (drive: Drive) => void;
  fetchDrives: () => Promise<Drive[]>;
}

export const DriveSelector: React.FC<DriveSelectorProperties> = ({ onSelect, fetchDrives }) => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

  useEffect(() => {
    // Fetch drives when the component mounts
    fetchDrives().then(setDrives).catch(console.error);
  }, [fetchDrives]);

  const handleSelectChange = (drive: Drive) => {
    console.log(drive);
    setSelectedDrive(drive);
  };

  console.log(drives);

  return (
    <Stack gap={2}>
      <DriveSelectorList onSelect={handleSelectChange} drives={drives} />
      <Button variant="contained" color="primary" disabled={!selectedDrive}>
        Next
      </Button>
    </Stack>
  );
};
