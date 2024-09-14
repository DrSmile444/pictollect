import Box from '@mui/material/Box';
import { Drive } from 'move-from-sd/src/interfaces';
import React from 'react';

import { DriveSelector } from './components/DriveSelector';
import { usePhotoContext } from './context/photo.context';

const App: React.FC = () => {
  const { step } = usePhotoContext();

  const stepMap: Record<string, React.ReactElement> = {
    drive: <DriveSelector />,
    directory: <h1>Directory</h1>,
    date: <h1>Date</h1>,
  };

  return <Box sx={{ padding: '20px' }}>{stepMap[step]}</Box>;
};

export default App;
