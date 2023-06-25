import {
  createInterface
} from 'node:readline/promises';
import {
  homedir
} from 'os';

import {
  showCurrentPath,
  goToUpperDirectory,
  changeDirectory,
  getFilesList
} from './navigationFunctions.js';
import {
  readFileContent,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile
} from './fileSystemFunctions.js';
import {
  osInfo
} from "./osFunctions.js";
import {
  calculateHash
} from './hashFunctions.js';
import {
  compressFile,
  decompressFile
} from './zlibFunctions.js'
import {
  CD_COMMAND,
  EXIT_COMMAND,
  READLINE_CONFIG,
  UP_COMMAND,
  LS_COMMAND,
  CAT_COMMAND,
  ADD_COMMAND,
  FIRST_COMMAND_PARAM,
  SECOND_COMMAND_PARAM,
  RN_COMMAND,
  CP_COMMAND,
  MV_COMMAND,
  RM_COMMAND,
  OS_COMMAND,
  ALL_COMMAND_PARAMS,
  HASH_COMMAND,
  COMPRESS_COMMAND,
  DECOMPRESS_COMMAND
} from './constants.js';

console.log(`Welcome to the File Manager, ${process.argv.slice(2)[0].split('=')[1]}!`);
process.on("exit", () => {
  console.log(`\nThank you for using File Manager, ${process.argv.slice(2)[0].split('=')[1]}, goodbye!`);
});

let currentPath = homedir();
openReadLine();

async function openReadLine() {
  showCurrentPath(currentPath);
  const readline = createInterface(READLINE_CONFIG);

  const command = await readline.question('Enter your command (or type ".exit"): ');
  readline.close();

  switch (command) {
    case EXIT_COMMAND:
      process.exit(0);
    case UP_COMMAND:
      currentPath = await goToUpperDirectory(currentPath);
      break;
    case `${CD_COMMAND} ${FIRST_COMMAND_PARAM(command)}`:
      currentPath = await changeDirectory(FIRST_COMMAND_PARAM(command), currentPath);
      break;
    case LS_COMMAND:
      await getFilesList(currentPath);
      break;
    case `${CAT_COMMAND} ${FIRST_COMMAND_PARAM(command)}`:
      await readFileContent(FIRST_COMMAND_PARAM(command), currentPath);
      break;
    case `${ADD_COMMAND} ${FIRST_COMMAND_PARAM(command)}`:
      await createFile(FIRST_COMMAND_PARAM(command), currentPath);
      break;
    case `${RN_COMMAND} ${FIRST_COMMAND_PARAM(command)} ${SECOND_COMMAND_PARAM(command)}`:
      await renameFile(FIRST_COMMAND_PARAM(command), SECOND_COMMAND_PARAM(command), currentPath);
      break;
    case `${CP_COMMAND} ${FIRST_COMMAND_PARAM(command)} ${SECOND_COMMAND_PARAM(command)}`:
      await copyFile(FIRST_COMMAND_PARAM(command), SECOND_COMMAND_PARAM(command), currentPath);
      break;
    case `${MV_COMMAND} ${FIRST_COMMAND_PARAM(command)} ${SECOND_COMMAND_PARAM(command)}`:
      await moveFile(FIRST_COMMAND_PARAM(command), SECOND_COMMAND_PARAM(command), currentPath);
      break;
    case `${RM_COMMAND} ${FIRST_COMMAND_PARAM(command)}`:
      await removeFile(FIRST_COMMAND_PARAM(command), currentPath);
      break;
    case `${OS_COMMAND} ${ALL_COMMAND_PARAMS(command).join(' ')}`:
      osInfo(ALL_COMMAND_PARAMS(command));
      break;
    case `${HASH_COMMAND} ${FIRST_COMMAND_PARAM(command)}`:
      await calculateHash(FIRST_COMMAND_PARAM(command), currentPath);
      break;
    case `${COMPRESS_COMMAND} ${FIRST_COMMAND_PARAM(command)} ${SECOND_COMMAND_PARAM(command)}`:
      await compressFile(FIRST_COMMAND_PARAM(command), SECOND_COMMAND_PARAM(command), currentPath);
      break;
    case `${DECOMPRESS_COMMAND} ${FIRST_COMMAND_PARAM(command)} ${SECOND_COMMAND_PARAM(command)}`:
      await decompressFile(FIRST_COMMAND_PARAM(command), SECOND_COMMAND_PARAM(command), currentPath);
      break;
    default:
      console.log('Invalid input');
  }
  openReadLine();
}