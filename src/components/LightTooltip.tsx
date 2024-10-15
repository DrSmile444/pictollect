import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React from 'react';

export const LightTooltip = styled(({ className, ...properties }: TooltipProps) => (
  <Tooltip arrow {...properties} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {},
}));
