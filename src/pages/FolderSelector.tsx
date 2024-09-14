import { Button, Stack, Typography } from '@mui/material';
import React from 'react';

import { usePhotoContext } from '../context';

export const FolderSelector = () => {
  const { directory, setStep } = usePhotoContext();

  const handleNextClick = () => {
    setStep('date');
  };

  const handlePreviousClick = () => {
    setStep('drive');
  };

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Folder
      </Typography>
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="contained" color="primary" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="contained" color="primary" disabled={!directory} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
