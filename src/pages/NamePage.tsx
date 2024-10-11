import { Button, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import { NameDestinationEditor } from '../components';
import { usePhotoContext } from '../context';

export const NamePage = () => {
  const { setStep, drive, directory, dateOfPhotos, action } = usePhotoContext();

  const handleNextClick = () => {
    setStep('progress');
  };

  const handlePreviousClick = () => {
    setStep('date');
  };

  const isPhotoStepReady = useMemo(() => !!drive && !!directory && !!dateOfPhotos && !!action, [drive, directory, dateOfPhotos, action]);

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Name and Destination
      </Typography>

      <NameDestinationEditor />

      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="outlined" color="primary" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="contained" color="primary" disabled={!isPhotoStepReady} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
