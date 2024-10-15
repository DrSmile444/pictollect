import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { ProgressDetails } from '../components';
import { useLayoutContext, usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { PhotoStep, ProcessCallbackInfo } from '../interfaces';

export const ProgressPage = () => {
  const { setStep, destination, computedFolderName, computedFiles, action } = usePhotoContext();
  const { processFiles, subscribeToProcessFilesProgress } = useOs();
  const { setTitle } = useLayoutContext();

  const [isProcessing, setIsProcessing] = useState(false);
  const [info, setInfo] = useState<ProcessCallbackInfo | null>(null);

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
    startProcessFiles();

    subscribeToProcessFilesProgress((info) => {
      setInfo(info);
      console.log('ProgressPage info', info);
    });

    setTitle('Progress');
  }, []);

  const handleNextClick = () => {
    setStep(null);
  };

  const handlePreviousClick = () => {
    setStep(PhotoStep.NAME);
  };

  return (
    <Stack gap={2}>
      <ProgressDetails info={info} totalFiles={computedFiles.length} type={action} />

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
