// DriveSelector.tsx
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

import { DriveSelectorList } from '../components';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const DriveSelector: FC = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setDrive, drive, setDirectory, setStep } = usePhotoContext();

  const { fetchDrives } = useOs();

  useEffect(() => {
    setIsLoading(true);
    // Fetch drives when the component mounts
    fetchDrives()
      .then(setDrives)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
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
      {isLoading && (
        <Stack gap={1} direction="column" alignItems="center" width="100%">
          <Skeleton variant="rounded" width="100%" height={88} />
          <Skeleton variant="rounded" width="100%" height={88} />
        </Stack>
      )}
      {!isLoading && <DriveSelectorList onSelect={handleSelectChange} drives={drives} drive={drive} />}
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="contained" color="primary" disabled={!drive} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
