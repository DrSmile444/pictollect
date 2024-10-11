export enum OperationType {
  COPY = 'copy',
  MOVE = 'move',
  DELETE = 'delete',
}

// Define the file operation interface
export interface FileOperation {
  operation: OperationType;
  sourcePath: string;
  destinationPath?: string; // Optional for delete operation
}

export interface ProcessCallbackProgress {
  type: 'progress';
  processedCount: number;
  elapsedTime: number;
  avgTimePerFile: number;
  remainingFiles: number;
  eta: number;
}

export interface ProcessCallbackError {
  type: 'error';
  error: string;
  sourcePath: string;
}

export interface ProcessCallbackEnd {
  type: 'end';
  elapsedTime: number;
}

export type ProcessCallbackInfo = ProcessCallbackProgress | ProcessCallbackError | ProcessCallbackEnd;

export interface ProcessFilesRequest {
  destinationFolder: string;
  fileOperations: FileOperation[];
}
