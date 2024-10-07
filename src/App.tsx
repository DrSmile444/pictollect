import { RestartAltRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import { usePhotoContext } from './context';
import { DateSelector, DriveSelector, FolderSelector, NamePage } from './pages';

const App: React.FC = () => {
  const { step, reset } = usePhotoContext();

  const stepMap: Record<string, React.ReactElement> = {
    drive: <DriveSelector />,
    directory: <FolderSelector />,
    date: <DateSelector />,
    name: <NamePage />,
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {stepMap[step]}
      <Button startIcon={<RestartAltRounded />} onClick={reset}>
        Reset
      </Button>
    </Box>
  );
};

export default App;
