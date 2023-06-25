import {
  ReadStream,
  WriteStream,
  access,
  mkdir
} from 'fs';
import {
  createBrotliCompress,
  createBrotliDecompress
} from 'zlib';
import {
  stat
} from 'fs/promises';

import {
  relativePathNormalization
} from './utils.js';

export const compressFile = async (pathToFile, destinationPath, currentPath) => {
  if (!pathToFile || !destinationPath || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);
      destinationPath = relativePathNormalization(destinationPath, currentPath);

      await stat(pathToFile);
      const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];

      access(destinationPath, async (error) => {
        if (error) {
          mkdir(destinationPath, async (error) => {
            if (error) {
              console.error(error);
            } else {
              const compressFilePromise = new Promise((resolve, reject) => {
                const readableStream = new ReadStream(pathToFile);
                const writeableStream = new WriteStream(`${destinationPath}\\${fileName}.br`);
                const brotli = createBrotliCompress();

                const stream = readableStream.pipe(brotli).pipe(writeableStream);
                stream.on('finish', () => {
                  console.log(`\nThe file ${fileName} was successfully compressed`);
                  stream.destroy();
                  resolve();
                });
                stream.on('error', (error) => {
                  console.error(error);
                  stream.destroy();
                  reject();
                });
              });

              await compressFilePromise;
            }
          })
        } else {
          const compressFilePromise = new Promise((resolve, reject) => {
            const readableStream = new ReadStream(pathToFile);
            const writeableStream = new WriteStream(`${destinationPath}\\${fileName}.br`);
            const brotli = createBrotliCompress();

            const stream = readableStream.pipe(brotli).pipe(writeableStream);
            stream.on('finish', () => {
              stream.destroy();
              console.log(`\nThe file ${fileName} was successfully compressed`);
              resolve();
            });
            stream.on('error', (error) => {
              stream.destroy();
              console.error(error);
              reject();
            });
          });

          await compressFilePromise;
        }
      })
    } catch (error) {
      console.error('Operation failed');
    }
  }
};

export const decompressFile = async (pathToFile, destinationPath, currentPath) => {
  if (!pathToFile || !destinationPath || !currentPath) {
    console.error('Operation failed');
  } else {
    try {
      pathToFile = relativePathNormalization(pathToFile, currentPath);
      destinationPath = relativePathNormalization(destinationPath, currentPath);

      await stat(pathToFile);
      const fileName = pathToFile.split('\\')[pathToFile.split('\\').length - 1];
      const decompressedFileName = fileName.slice(0, fileName.length - 3);

      access(destinationPath, async (error) => {
        if (error) {
          mkdir(destinationPath, async (error) => {
            if (error) {
              console.error(error);
            } else {
              const decompressFilePromise = new Promise((resolve, reject) => {
                const readableStream = new ReadStream(pathToFile);
                const writeableStream = new WriteStream(`${destinationPath}\\${decompressedFileName}`);
                const brotli = createBrotliDecompress();

                const stream = readableStream.pipe(brotli).pipe(writeableStream);
                stream.on('finish', () => {
                  console.log(`\nThe file ${fileName} was successfully decompressed`);
                  stream.destroy();
                  resolve();
                });
                stream.on('error', (error) => {
                  console.error(error);
                  stream.destroy();
                  reject();
                });
              });

              await decompressFilePromise;
            }
          })
        } else {
          const decompressFilePromise = new Promise((resolve, reject) => {
            const readableStream = new ReadStream(pathToFile);
            const writeableStream = new WriteStream(`${destinationPath}\\${decompressedFileName}`);
            const brotli = createBrotliDecompress();

            const stream = readableStream.pipe(brotli).pipe(writeableStream);
            stream.on('finish', () => {
              stream.destroy();
              console.log(`\nThe file ${fileName} was successfully decompressed`);
              resolve();
            });
            stream.on('error', (error) => {
              stream.destroy();
              console.error(error);
              reject();
            });
          });

          await decompressFilePromise;
        }
      })
    } catch (error) {
      console.error('Operation failed');
    }
  }
};