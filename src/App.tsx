import { RestartAltRounded } from '@mui/icons-material';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import theme from './config/theme';
import { Layout } from './components';
import { usePhotoContext } from './context';
import { DateSelector, DriveSelector, FolderSelector, NamePage, ProgressPage } from './pages';

const App: React.FC = () => {
  const { step, reset } = usePhotoContext();

  const stepMap: Record<typeof step, React.ReactElement> = {
    drive: <DriveSelector />,
    directory: <FolderSelector />,
    date: <DateSelector />,
    name: <NamePage />,
    progress: <ProgressPage />,
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Layout>
        {stepMap[step]}
        <Button startIcon={<RestartAltRounded />} onClick={reset}>
          Reset
        </Button>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
