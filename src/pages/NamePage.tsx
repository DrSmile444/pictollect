import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

import { NameDestinationEditor } from '../components';
import { usePhotoContext } from '../context';

export const NamePage = () => {
  const { setStep } = usePhotoContext();

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep('date');
  };

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
        <Button variant="contained" color="primary" disabled={true} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
