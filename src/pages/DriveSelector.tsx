// DriveSelector.tsx
import { RefreshRounded } from '@mui/icons-material';
import { Button, Skeleton, Stack } from '@mui/material';
import { Drive } from 'move-from-sd/src/interfaces';
import React, { FC, useEffect, useState } from 'react';

import { DriveSelectorList } from '../components';
import { useLayoutContext, usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { PhotoStep } from '../interfaces';

export const DriveSelector: FC = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setDrive, drive, setDirectory, setStep, hasPrevious } = usePhotoContext();
  const { setTitle } = useLayoutContext();

  const { fetchDrives } = useOs();

  const handleNextClick = () => {
    setStep(PhotoStep.DIRECTORY);
  };

  const refreshDrives = () => {
    setIsLoading(true);
    fetchDrives()
      .then(setDrives)
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refreshDrives();
    setTitle('Select a Drive');
  }, []);

  const handleSelectChange = (drive: Drive) => {
    setDrive(drive);
    setDirectory(null);
  };

  const handleDoubleSelectChange = (drive: Drive) => {
    setDrive(drive);
    setDirectory(null);
    handleNextClick();
  };

  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row">
        <Button onClick={refreshDrives} variant="outlined" startIcon={<RefreshRounded />}>
          Refresh
        </Button>
      </Stack>
      {isLoading && (
        <Stack gap={1} direction="column" alignItems="center" width="100%">
          <Skeleton variant="rounded" width="100%" height={88} />
          <Skeleton variant="rounded" width="100%" height={88} />
        </Stack>
      )}
      {!isLoading && (
        <DriveSelectorList
          onSelect={handleSelectChange}
          onDoubleSelect={handleDoubleSelectChange}
          drives={drives}
          drive={drive}
          hasPrevious={hasPrevious}
        />
      )}
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="contained" color="primary" disabled={!drive} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
