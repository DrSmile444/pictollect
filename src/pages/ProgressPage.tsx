import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const ProgressPage = () => {
  const { setStep, destination, computedFolderName, computedFiles, action } = usePhotoContext();
  const { processFiles, subscribeToProcessFilesProgress } = useOs();

  const [isProcessing, setIsProcessing] = useState(false);

  const startProcessFiles = async () => {
    setIsProcessing(true);
    await processFiles({
      destinationFolder: [destination, computedFolderName].join('/'),
      fileOperations: computedFiles.map((file) => ({
        operation: action,
        sourcePath: file.file,
      })),
    });

    setIsProcessing(false);
  };

  useEffect(() => {
    console.log('ProgressPage', { destination, computedFolderName, computedFiles, action });
    startProcessFiles();

    subscribeToProcessFilesProgress((info) => {
      console.log('ProgressPage info', info);
    });
  }, []);

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep('name');
  };

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Progress
      </Typography>

      {JSON.stringify({ isProcessing })}

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
