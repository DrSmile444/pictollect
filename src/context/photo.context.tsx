import { Drive } from 'move-from-sd/src/interfaces';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface PhotoContextType {
  step: 'drive' | 'directory' | 'date';
  drive: Drive | null;
  directory: string | null;
  dateOfPhotos: Date | null;
  setStep: (step: 'drive' | 'directory' | 'date') => void;
  setDrive: (drive: Drive) => void;
  setDirectory: (directory: string) => void;
  setDateOfPhotos: (date: Date) => void;
  hasPrevious: boolean | null;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

// Custom hook for consuming the context
export const usePhotoContext = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};

// Provider component
export const PhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<'drive' | 'directory' | 'date'>('drive');
  const [drive, setDrive] = useState<Drive | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);
  const [dateOfPhotos, setDateOfPhotos] = useState<Date | null>(null);

  const [hasPrevious, setHasPrevious] = useState<boolean | null>(null);

  const fetchStore = async () => {
    const store = await window.electronStore.get('photoContext');
    if (store) {
      setDrive(store.drive);
      setDirectory(store.directory);
      setDateOfPhotos(store.dateOfPhotos);
      setStep(store.step);

      setHasPrevious(true);
    }

    setHasPrevious(false);
  };

  useEffect(() => {
    if (hasPrevious !== null) {
      window.electronStore.set('photoContext', {
        drive,
        directory,
        dateOfPhotos,
        step,
      });
    }
  }, [step, drive, directory, dateOfPhotos, hasPrevious]);

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <PhotoContext.Provider value={{ drive, directory, dateOfPhotos, step, hasPrevious, setDrive, setDirectory, setDateOfPhotos, setStep }}>
      {children}
    </PhotoContext.Provider>
  );
};
