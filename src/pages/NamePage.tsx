import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

import { NameDestinationEditor } from '../components';
import { useLayoutContext, usePhotoContext } from '../context';
import { PhotoStep } from '../interfaces';

export const NamePage = () => {
  const { setStep, drive, directory, dateOfPhotos, action } = usePhotoContext();

  const { setTitle } = useLayoutContext();

  const handleNextClick = () => {
    setStep(PhotoStep.PROGRESS);
  };

  const handlePreviousClick = () => {
    setStep(PhotoStep.DATE);
  };

  const isPhotoStepReady = useMemo(() => !!drive && !!directory && !!dateOfPhotos && !!action, [drive, directory, dateOfPhotos, action]);

  useEffect(() => {
    setTitle('Name and Destination');
  }, []);

  return (
    <Stack gap={2}>
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
