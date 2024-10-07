import { Button, Stack, Typography } from '@mui/material';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { useEffect, useState } from 'react';

import { DatePhotoGrid } from '../components/DatePhotoGrid';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const DateSelector = () => {
  const { dateOfPhotos, directory, setStep, files, setFiles } = usePhotoContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getFiles } = useOs();

  const handleNextClick = () => {
    setStep('name');
  };

  const handlePreviousClick = () => {
    setStep('directory');
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const newFiles = await getFiles(directory);
      setFiles(newFiles);
      setIsLoading(false);
      console.info('Files:', newFiles);
    };

    fetch();
  }, []);

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Date
      </Typography>
      <DatePhotoGrid fileList={files} isLoading={isLoading} />
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
