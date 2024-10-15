import { IpcMain } from 'electron';
import { Dispatch, SetStateAction } from 'react';

export type IpcMainHandler = Parameters<IpcMain['handle']>[1];

export type SetterType<FieldName extends string, FieldType> = {
  [K in FieldName | `set${Capitalize<FieldName>}`]: K extends `set${Capitalize<FieldName>}`
    ? Dispatch<SetStateAction<FieldType>>
    : FieldType;
};

export * from './photo.interface';
export * from './process-files.interface';
