import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { FolderSelectorList } from '../components';
import { useLayoutContext, usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { PhotoStep } from '../interfaces';

export const FolderSelector = () => {
  const { drive, directory, setDirectory, setStep } = usePhotoContext();
  const [folders, setFolders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { fetchFolders } = useOs();
  const { setTitle } = useLayoutContext();

  const handleNextClick = () => {
    setStep(PhotoStep.DATE);
  };

  const handlePreviousClick = () => {
    setStep(PhotoStep.DRIVE);
  };

  const handleFolderSelect = (folder: string) => {
    setDirectory(folder);
  };

  const handleFolderDoubleSelect = (folder: string) => {
    setDirectory(folder);
    handleNextClick();
  };

  useEffect(() => {
    if (!drive) {
      return;
    }

    const fetch = async () => {
      setIsLoading(true);
      const folders = await fetchFolders(drive.drive);
      setFolders(folders);
      setIsLoading(false);
    };

    setTitle('Select a Folder');
    fetch();
  }, [drive]);

  return (
    <Stack gap={2}>
      <FolderSelectorList
        folders={folders}
        onFolderSelect={handleFolderSelect}
        onFolderDoubleSelect={handleFolderDoubleSelect}
        folder={directory}
        isLoading={isLoading}
      />
      <Stack gap={1} direction="row" alignItems="right">
        <Button variant="outlined" color="primary" onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant="contained" color="primary" disabled={!directory} onClick={handleNextClick}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
