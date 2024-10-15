import { blue } from '@mui/material/colors';
import type { ThemeOptions } from '@mui/material/styles/createTheme';

export const tooltipTheme: ThemeOptions['components'] = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: blue[50],
        color: '#333333',
        boxShadow: '1px 1px 0px 0px #00000024',
        fontSize: 13,
        fontWeight: 400,
        padding: '8px 12px 8px 12px !important',
        whiteSpace: 'pre-line',
      },
      arrow: {
        color: blue[50],
      },
      tooltipPlacementBottom: {
        top: '-10px',
      },
    },
  },
};
