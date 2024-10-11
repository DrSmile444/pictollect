// Define an enum for operation types
import fs from 'node:fs';
import path from 'node:path';

import { FileOperation, OperationType, ProcessCallbackInfo } from '../interfaces';

// Helper functions
async function copyFile(source: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.copyFile(source, destination, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function moveFile(source: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.rename(source, destination, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// Function to perform file operations with tracking and ETA
export async function processFiles(
  destinationFolder: string,
  fileOperations: FileOperation[],
  callback: (info: ProcessCallbackInfo) => void,
) {
  let processedCount = 0;
  const startTime = performance.now();

  // Create destination folder if it doesn't exist
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }

  for (const [index, operation] of fileOperations.entries()) {
    const { operation: opType, sourcePath, destinationPath } = operation;
    const targetPath = destinationPath ?? path.join(destinationFolder, path.basename(sourcePath));

    try {
      switch (opType) {
        case OperationType.COPY: {
          await copyFile(sourcePath, targetPath);
          break;
        }
        case OperationType.MOVE: {
          await moveFile(sourcePath, targetPath);
          break;
        }
        case OperationType.DELETE: {
          await deleteFile(sourcePath);
          break;
        }
        default: {
          throw new Error(`Unsupported operation: ${opType}`);
        }
      }

      processedCount += 1;
      const elapsedTime = performance.now() - startTime;
      const avgTimePerFile = elapsedTime / processedCount;
      const remainingFiles = fileOperations.length - processedCount;
      const eta = avgTimePerFile * remainingFiles;

      callback({ type: 'progress', processedCount, elapsedTime, avgTimePerFile, remainingFiles, eta });
    } catch (error) {
      callback({ type: 'error', error: error.message, sourcePath });
      console.error(`Failed to ${opType} file: ${sourcePath}. Error: ${error.message}`);
    }
  }

  callback({ type: 'end', elapsedTime: performance.now() - startTime });
  return {
    processedCount,
    elapsedTime: performance.now() - startTime,
  };
}
