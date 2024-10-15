import React, { createContext, useContext, useState } from 'react';

import { ConfirmationDialog, ConfirmationDialogProperties } from '../components';

interface ConfirmationServiceContextType {
  showConfirmation: (properties: ConfirmationDialogProperties | null) => void;
}

export interface ConfirmationServiceProviderProperties {
  children: React.ReactNode;
}

const ConfirmationServiceContext = createContext<ConfirmationServiceContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationServiceContext);
  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const defaultProps: ConfirmationDialogProperties = {
  open: false,
  title: '',
  body: '',
  acceptButtonText: '',
  cancelButtonText: '',
  onClose: emptyFunction,
  onAccept: emptyFunction,
};

export const ConfirmationProvider: React.FC<ConfirmationServiceProviderProperties> = ({ children }) => {
  const [dialogProperties, setDialogProperties] = useState<ConfirmationDialogProperties>(defaultProps);

  const showConfirmation = (properties: ConfirmationDialogProperties | null) => {
    if (!properties) {
      setDialogProperties(defaultProps);
      return;
    }

    setDialogProperties(properties);
  };

  return (
    <ConfirmationServiceContext.Provider value={{ showConfirmation }}>
      {children}
      <ConfirmationDialog {...dialogProperties} />
    </ConfirmationServiceContext.Provider>
  );
};
