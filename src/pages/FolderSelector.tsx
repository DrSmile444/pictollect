import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import { FolderSelectorList } from '../components';
import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const FolderSelector = () => {
  const { drive, directory, setDirectory, setStep } = usePhotoContext();
  const [folders, setFolders] = React.useState<string[]>([]);

  const { fetchFolders } = useOs();

  const handleNextClick = () => {
    setStep('date');
  };

  const handlePreviousClick = () => {
    setStep('drive');
  };

  const handleFolderSelect = (folder: string) => {
    setDirectory(folder);
  };

  useEffect(() => {
    const fetch = async () => {
      const folders = await fetchFolders(drive.drive);
      setFolders(folders);
    };

    fetch();
  }, [drive]);

  return (
    <Stack gap={2}>
      <Typography variant="h2" typography="h4">
        Select a Folder
      </Typography>
      <FolderSelectorList folders={folders} onFolderSelect={handleFolderSelect} />
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
