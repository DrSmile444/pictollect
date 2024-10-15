import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

export interface ConfirmationDialogProperties {
  open: boolean;
  title: string;
  titleIcon?: React.ReactElement;
  body: string | React.ReactElement;
  cancelButtonText: string;
  acceptButtonText: string;
  onClose: () => void;
  onAccept: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProperties> = ({
  open,
  title,
  titleIcon,
  body,
  cancelButtonText,
  acceptButtonText,
  onClose,
  onAccept,
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle component="div" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {titleIcon} {title}
    </DialogTitle>
    <DialogContent>{body}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        {cancelButtonText}
      </Button>
      <Button onClick={onAccept} color="primary">
        {acceptButtonText}
      </Button>
    </DialogActions>
  </Dialog>
);
