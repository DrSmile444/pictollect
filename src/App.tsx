import Box from '@mui/material/Box';
import { Drive } from 'move-from-sd/src/interfaces';
import React from 'react';

import { DriveSelector } from './components/DriveSelector';

const App: React.FC = () => {
  const handleDriveSelect = (drive: Drive) => {
    console.log('Selected Drive:', drive);
    // You can add logic to handle the selected drive
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <h1>Select a Drive</h1>
      <DriveSelector onSelect={handleDriveSelect} />
    </Box>
  );
};

export default App;
