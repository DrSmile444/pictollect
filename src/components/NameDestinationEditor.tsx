import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC, useMemo } from 'react';

import { usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { selectBalancedItems } from '../utils';

import { DatePhoto } from './DatePhoto';
import { DetailRow } from './DetailRow';

export const NameDestinationEditor: FC = () => {
  const { destination, setDestination, computedFolderName, folderName, setFolderName, dateOfPhotos, files } = usePhotoContext();

  const { pickFolder } = useOs();

  const chooseDestination = async () => {
    const folder = await pickFolder();
    if (folder.canceled) {
      return;
    }

    setDestination(folder.filePaths[0]);
  };

  const photos = useMemo(() => (files ? files.files.filter((file) => file.fullDate === dateOfPhotos?.value) : []), [files, dateOfPhotos]);

  const displayPhotos = useMemo(() => selectBalancedItems(photos, 100), [photos]);

  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row">
        <Card sx={{ width: '100%', padding: 2 }}>
          <Stack gap={1}>
            <Typography variant="h3" typography="h5">
              Settings
            </Typography>

            <TextField
              id="outlined-basic"
              value={folderName}
              label="Folder Name"
              variant="outlined"
              onChange={(event) => {
                setFolderName(event.target.value);
              }}
            />
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

            <DetailRow label="Folder Name" value={computedFolderName} />
            <DetailRow label="Destination" value={destination} />
          </Stack>
        </Card>
      </Stack>

      <Card sx={{ width: '100%', padding: 2 }}>
        <Typography variant="h3" typography="h5">
          Photos
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Displayed {displayPhotos.length} photos of {photos.length}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {displayPhotos.map((photo) => (
            <DatePhoto photo={photo} gridSize={3} key={photo.fileName} />
          ))}
        </Box>
      </Card>
    </Stack>
  );
};
