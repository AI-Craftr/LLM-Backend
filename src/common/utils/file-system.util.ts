import { existsSync, unlinkSync } from 'fs';

export const checkIfExists = (filePath: string) => {
  return existsSync(filePath);
};

export const deleteIfExists = (filePath: string) => {
  if (existsSync(filePath)) unlinkSync(filePath);
};
