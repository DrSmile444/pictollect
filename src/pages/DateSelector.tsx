import { Button, Stack, Typography } from '@mui/material';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { useEffect, useState } from 'react';

import { DatePhotoGrid } from '../components/DatePhotoGrid';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const DateSelector = () => {
  const { dateOfPhotos, directory, setStep } = usePhotoContext();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getFiles } = useOs();

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep('directory');
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      // const files = await getFiles('/Users/dmytrovakulenko/Downloads/photos');
      const files = await getFiles(directory);
      // const files = await getFiles('F:/DCIM/106EOSR6');
      // const files = await getFiles('/Users/dmytrovakulenko/Downloads');
      setFiles(files);
      setIsLoading(false);
      console.log(files);
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
