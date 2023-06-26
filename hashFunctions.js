import {
  readFile
} from "fs";
import {
  stat
} from 'fs/promises';
import {
  createHash
} from 'crypto';

import {
  relativePathNormalization
} from './utils.js';

export const calculateHash = async (pathToFile, currentPath) => {
  if (!pathToFile || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);

      await stat(pathToFile);
      const algorithm = 'sha256';
      const calculateHashPromise = new Promise((resolve, reject) => {
        const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

        readFile(pathToFile, (error, data) => {
          if (error) {
            console.error(error);
            reject();
          }
          if (data) {
            const hashSum = createHash(algorithm);
            hashSum.update(data);
            const hex = hashSum.digest('hex');
            console.log(`The hash for file ${fileName}: ${hex}`);
            resolve();
          }
        })
      });

      await calculateHashPromise;
    } catch (error) {
      console.error('Operation failed');
    }
  }
};