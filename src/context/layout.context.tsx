import React, { createContext, ReactNode, useContext, useState } from 'react';

import { SetterType } from '../interfaces';

export type LayoutContextSetters = SetterType<'title', string>;

export type LayoutContextType = LayoutContextSetters;

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState<string>('');

  const contextSetters: LayoutContextSetters = {
    title,
    setTitle,
  };

  return (
    <LayoutContext.Provider
      value={{
        ...contextSetters,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
