import Box from '@mui/material/Box';
import { Drive } from 'move-from-sd/src/interfaces';
import React from 'react';

import { usePhotoContext } from './context';
import { DriveSelector, FolderSelector } from './pages';

const App: React.FC = () => {
  const { step } = usePhotoContext();

  const stepMap: Record<string, React.ReactElement> = {
    drive: <DriveSelector />,
    directory: <FolderSelector />,
    date: <h1>Date</h1>,
  };

  return <Box sx={{ padding: '20px' }}>{stepMap[step]}</Box>;
};

export default App;
