import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { DatePhotoGrid } from '../components/DatePhotoGrid';
import { useLayoutContext, usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { PhotoStep } from '../interfaces';

export const DateSelector = () => {
  const { dateOfPhotos, directory, setStep, files, setFiles } = usePhotoContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getFiles } = useOs();
  const { setTitle } = useLayoutContext();

  const handleNextClick = () => {
    setStep(PhotoStep.NAME);
  };

  const handlePreviousClick = () => {
    setStep(PhotoStep.DIRECTORY);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const newFiles = await getFiles(directory);
      setFiles(newFiles);
      setIsLoading(false);
      console.info('Files:', newFiles);
    };

    setTitle('Select a Date');

    fetch();
  }, []);

  return (
    <Stack gap={2}>
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
