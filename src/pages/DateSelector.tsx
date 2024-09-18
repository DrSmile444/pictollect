import { Button, Stack, Typography } from '@mui/material';
import { FileList } from 'move-from-sd/src/interfaces';
import React, { useEffect } from 'react';

import { DatePhotoGrid } from '../components/DatePhotoGrid';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const DateSelector = () => {
  const { dateOfPhotos, setStep } = usePhotoContext();
  const [files, setFiles] = React.useState<FileList | null>(null);

  const { getFiles } = useOs();

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep('directory');
  };

  useEffect(() => {
    const fetch = async () => {
      const files = await getFiles('/Users/dmytrovakulenko/Downloads/photos');
      setFiles(files);
      console.log(files);
    };

    fetch();
  }, []);

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Date
      </Typography>
      <DatePhotoGrid fileList={files} />
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
