import { DateMeta, Drive, FileList, FileMeta } from 'move-from-sd/src/interfaces';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { OperationType, PhotoStep, SetterType } from '../interfaces';

type PhotoContextSetters = SetterType<'step', PhotoStep> &
  SetterType<'drive', Drive> &
  SetterType<'directory', string> &
  SetterType<'dateOfPhotos', DateMeta> &
  SetterType<'destination', string> &
  SetterType<'folderName', string> &
  SetterType<'files', FileList> &
  SetterType<'action', OperationType>;

interface PhotoContextType extends PhotoContextSetters {
  computedFolderName: string | null;
  computedFiles: FileMeta[] | null;
  hasPrevious: boolean | null;
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
  const [step, setStep] = useState<PhotoContextSetters['step']>(PhotoStep.DRIVE);
  const [drive, setDrive] = useState<Drive | null>(null);
  const [directory, setDirectory] = useState<string | null>(null);
  const [dateOfPhotos, setDateOfPhotos] = useState<DateMeta | null>(null);

  const [files, setFiles] = useState<FileList | null>(null);

  const [folderName, setFolderName] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [action, setAction] = useState<OperationType | null>(null);

  const [hasPrevious, setHasPrevious] = useState<boolean | null>(null);

  const computedFolderName = useMemo(
    () => [dateOfPhotos?.value, folderName?.trim().split(' ').join('-').toLowerCase()].filter(Boolean).join('-'),
    [dateOfPhotos, folderName],
  );

  const computedFiles = useMemo(
    () => (files ? files.files.filter((file) => file.fullDate === dateOfPhotos?.value) : []),
    [files, dateOfPhotos],
  );

  const reset = () => {
    setDrive(null);
    setDirectory(null);
    setDateOfPhotos(null);
    setStep(PhotoStep.DRIVE);
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
      setAction(store.action);

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
        action,
      });

      window.electronStore.set('destination', destination);
    }
  }, [step, drive, directory, dateOfPhotos, hasPrevious, destination, folderName, files, action]);

  useEffect(() => {
    fetchStore();
  }, []);

  const contextSetters: PhotoContextSetters = {
    step,
    drive,
    directory,
    dateOfPhotos,
    destination,
    folderName,
    files,
    action,
    setStep,
    setDrive,
    setDirectory,
    setDateOfPhotos,
    setDestination,
    setFolderName,
    setFiles,
    setAction,
  };

  return (
    <PhotoContext.Provider
      value={{
        ...contextSetters,
        hasPrevious,
        computedFolderName,
        computedFiles,
        reset,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
