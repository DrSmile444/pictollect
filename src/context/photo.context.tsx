import { DateMeta, Drive, FileList } from 'move-from-sd/src/interfaces';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface PhotoContextType {
  step: 'drive' | 'directory' | 'date' | 'name';
  drive: Drive | null;
  directory: string | null;
  dateOfPhotos: DateMeta | null;
  destination: string | null;
  folderName: string | null;
  computedFolderName: string | null;
  files: FileList | null;
  setStep: (step: 'drive' | 'directory' | 'date' | 'name') => void;
  setDrive: (drive: Drive) => void;
  setDirectory: (directory: string) => void;
  setDateOfPhotos: (date: DateMeta) => void;
  setDestination: (destination: string) => void;
  hasPrevious: boolean | null;
  setFolderName: (name: string) => void;
  setFiles: (files: FileList) => void;
  reset: () => void;
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
  const [step, setStep] = useState<'drive' | 'directory' | 'date' | 'name'>('drive');
  const [drive, setDrive] = useState<Drive | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);
  const [dateOfPhotos, setDateOfPhotos] = useState<DateMeta | null>(null);

  const [files, setFiles] = useState<FileList | null>(null);

  const [folderName, setFolderName] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);

  const [hasPrevious, setHasPrevious] = useState<boolean | null>(null);

  const computedFolderName = useMemo(
    () => [dateOfPhotos?.value, folderName?.trim().split(' ').join('-').toLowerCase()].filter(Boolean).join('-'),
    [dateOfPhotos, folderName],
  );

  const reset = () => {
    setDrive(null);
    setDirectory(null);
    setDateOfPhotos(null);
    setStep('drive');
    window.electronStore.delete('photoContext');
  };

  const fetchStore = async () => {
    const store = await window.electronStore.get('photoContext');
    const destination = await window.electronStore.get('destination');
    if (store) {
      setDrive(store.drive);
      setDirectory(store.directory);
      setDateOfPhotos(store.dateOfPhotos);
      setStep(store.step);
      setFolderName(store.folderName);

      setDestination(destination);

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
        folderName,
      });

      window.electronStore.set('destination', destination);
    }
  }, [step, drive, directory, dateOfPhotos, hasPrevious, destination, folderName, files]);

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <PhotoContext.Provider
      value={{
        drive,
        directory,
        dateOfPhotos,
        step,
        hasPrevious,
        destination,
        folderName,
        computedFolderName,
        files,
        setFolderName,
        setDrive,
        setDirectory,
        setDateOfPhotos,
        setStep,
        reset,
        setDestination,
        setFiles,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
