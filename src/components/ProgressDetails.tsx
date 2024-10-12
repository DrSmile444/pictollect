import React, { FC } from 'react';

import { OperationType, ProcessCallbackInfo } from '../interfaces';

import { ProcessEnd } from './ProcessEnd';
import { ProcessError } from './ProcessError';
import { ProcessProgress } from './ProcessProgress';

export interface ProgressDetailsProperties {
  info: ProcessCallbackInfo;
  totalFiles: number;
  type: OperationType;
}

export const ProgressDetails: FC<ProgressDetailsProperties> = ({ info, totalFiles, type }) => {
  switch (info.type) {
    case 'progress': {
      return <ProcessProgress info={info} totalFiles={totalFiles} type={type} />;
    }

    case 'error': {
      return <ProcessError info={info} totalFiles={totalFiles} type={type} />;
    }

    case 'end': {
      return <ProcessEnd info={info} totalFiles={totalFiles} type={type} />;
    }
  }
};
