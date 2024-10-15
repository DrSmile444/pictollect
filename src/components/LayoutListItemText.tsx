import { CheckRounded } from '@mui/icons-material';
import { ListItemText, Stack } from '@mui/material';
import React, { FC } from 'react';

export interface LayoutListItemTextProperties {
  title: string;
  icon?: React.ReactNode;
  active: boolean;
}

export const LayoutListItemText: FC<LayoutListItemTextProperties> = ({ title, icon, active }) => (
  <ListItemText>
    <Stack justifyContent="space-between" alignItems="center" direction="row">
      {title}
      {active && (icon || <CheckRounded fontSize="small" />)}
    </Stack>
  </ListItemText>
);
