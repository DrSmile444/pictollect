import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import React, { FC } from 'react';

import { usePhotoContext } from '../context';
import { useOs } from '../hooks';

export const NameDestinationEditor: FC = () => {
  const { destination, setDestination } = usePhotoContext();

  const { pickFolder } = useOs();

  const chooseDestination = async () => {
    const folder = await pickFolder();
    if (folder.canceled) {
      return;
    }

    setDestination(folder.filePaths[0]);
  };

  return (
    <Stack gap={2} direction="row">
      <Card sx={{ width: '100%', padding: 2 }}>
        <Stack gap={1}>
          <Typography variant="h3" typography="h5">
            Settings
          </Typography>

          <TextField id="outlined-basic" label="Folder Name" variant="outlined" />
          <Button onClick={chooseDestination} variant="outlined">
            Choose Destination
          </Button>
        </Stack>
      </Card>

      <Card sx={{ width: '100%', padding: 2 }}>
        <Stack gap={1}>
          <Typography variant="h3" typography="h5">
            Preview
          </Typography>
          <Typography variant="body1" typography="body1">
            Destination: {destination || 'Empty'}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
};
