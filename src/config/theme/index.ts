import type { ThemeOptions } from '@mui/material/styles/createTheme';
import { deepmerge } from '@mui/utils';

import { tooltipTheme } from './tooltip.theme';

const defaultTheme: ThemeOptions = {
  components: {
    ...tooltipTheme,
  },
};

// A custom theme for this app
const theme = deepmerge(defaultTheme, {});

export default theme;
