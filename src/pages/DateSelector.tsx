import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

import { usePhotoContext } from '../context';

export const DateSelector = () => {
  const { dateOfPhotos, setStep } = usePhotoContext();

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep('directory');
  };

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Date
      </Typography>
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="outlined" color="primary" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="contained" color="primary" disabled={!dateOfPhotos} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
