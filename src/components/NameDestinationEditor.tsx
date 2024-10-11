import { DeleteRounded, FileCopyRounded, MoveDownRounded } from '@mui/icons-material';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC, useMemo } from 'react';

import { usePhotoContext } from '../context';
import { useOs } from '../hooks';
import { OperationType } from '../interfaces';
import { selectBalancedItems } from '../utils';

import { DatePhoto } from './DatePhoto';
import { DetailRow } from './DetailRow';

export const NameDestinationEditor: FC = () => {
  const { destination, setDestination, computedFolderName, computedFiles, folderName, setFolderName, setAction, action } =
    usePhotoContext();

  const { pickFolder } = useOs();

  const chooseDestination = async () => {
    const folder = await pickFolder();
    if (folder.canceled) {
      return;
    }

    setDestination(folder.filePaths[0]);
  };

  const displayPhotos = useMemo(() => selectBalancedItems(computedFiles, 100), [computedFiles]);

  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row">
        <Card sx={{ width: '100%', padding: 2 }}>
          <Stack gap={1}>
            <Typography variant="h3" typography="h5">
              Settings
            </Typography>

            <Typography sx={{ fontWeight: 'bold' }}>Naming</Typography>

            <TextField
              id="outlined-basic"
              value={folderName}
              label="Folder Name"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setFolderName(event.target.value);
              }}
            />

            <Button onClick={chooseDestination} variant="outlined">
              Choose Destination
            </Button>

            {/* <Typography variant="subtitle1" color="textSecondary">*/}
            <Typography sx={{ fontWeight: 'bold' }}>Action</Typography>

            <Stack gap={1} direction="row">
              <Button
                variant={action === OperationType.COPY ? 'contained' : 'outlined'}
                color={action === OperationType.COPY ? 'success' : 'primary'}
                onClick={() => setAction(OperationType.COPY)}
              >
                <Stack alignItems="center">
                  <FileCopyRounded />
                  Copy
                </Stack>
              </Button>

              <Button
                variant={action === OperationType.MOVE ? 'contained' : 'outlined'}
                color={action === OperationType.MOVE ? 'warning' : 'primary'}
                onClick={() => setAction(OperationType.MOVE)}
              >
                <Stack alignItems="center">
                  <MoveDownRounded />
                  Move
                </Stack>
              </Button>

              <Button
                variant={action === OperationType.DELETE ? 'contained' : 'outlined'}
                color={action === OperationType.DELETE ? 'error' : 'primary'}
                onClick={() => setAction(OperationType.DELETE)}
              >
                <Stack alignItems="center">
                  <DeleteRounded />
                  Delete
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </Card>

        <Card sx={{ width: '100%', padding: 2 }}>
          <Stack gap={1}>
            <Typography variant="h3" typography="h5">
              Preview
            </Typography>

            <DetailRow label="Folder Name" value={computedFolderName} />
            <DetailRow label="Destination" value={destination} />
            <DetailRow label="Action" value={action} />
          </Stack>
        </Card>
      </Stack>

      <Card sx={{ width: '100%', padding: 2 }}>
        <Typography variant="h3" typography="h5">
          Photos
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Displayed {displayPhotos.length} photos of {computedFiles.length}
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
