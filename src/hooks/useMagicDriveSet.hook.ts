import { useEffect, useState } from 'react';

import { Drive } from '../../../move-from-sd/src/interfaces';
import { PhotoStep } from '../interfaces';

export interface UseMagicDriveSetProperties {
  step: PhotoStep;
  drive: Drive | null;
  drives: Drive[];
  setDrive: (drive: Drive) => void;
  setStep: (step: PhotoStep) => void;
}

export const useMagicDriveSet = ({ step, drives, drive, setDrive, setStep }: UseMagicDriveSetProperties) => {
  const [hasMagicDriveApplied, setHasMagicDriveApplied] = useState<boolean>(false);
  const [hasMagicDriveNavigated, setHasMagicDriveNavigated] = useState<boolean>(false);

  const magicDriveUpdate = async () => {
    const lastDrive = await window.electronStore.get('lastDrive');

    const foundDrive = drives.find((d) => d.drive === lastDrive?.drive);

    if (foundDrive) {
      console.log('foundDrive', foundDrive);
      setDrive(foundDrive);
    }
  };

  useEffect(() => {
    if (!drive && !hasMagicDriveApplied && drives.length > 0) {
      magicDriveUpdate();
      setHasMagicDriveApplied(true);

      if (!hasMagicDriveNavigated) {
        setStep(PhotoStep.DIRECTORY);
        setHasMagicDriveNavigated(true);
      }
    }
  }, [drive, drives, hasMagicDriveApplied, hasMagicDriveNavigated]);

  useEffect(() => {
    if (step === PhotoStep.DIRECTORY) {
      console.log('lastDrive', drive);
      window.electronStore.set('lastDrive', drive);
    }
  }, [step, drive]);

  return {
    setHasMagicDriveApplied,
  };
};
