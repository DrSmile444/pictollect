import Box from '@mui/material/Box';
import React from 'react';

import { usePhotoContext } from './context';
import { DateSelector, DriveSelector, FolderSelector } from './pages';

const App: React.FC = () => {
  const { step } = usePhotoContext();

  const stepMap: Record<string, React.ReactElement> = {
    drive: <DriveSelector />,
    directory: <FolderSelector />,
    date: <DateSelector />,
  };

  return <Box sx={{ padding: '20px' }}>{stepMap[step]}</Box>;
};

export default App;
