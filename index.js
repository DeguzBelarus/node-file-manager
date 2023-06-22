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
  createFile
} from './fileSystemFunctions.js';
import {
  CD_COMMAND,
  EXIT_COMMAND,
  READLINE_CONFIG,
  UP_COMMAND,
  LS_COMMAND,
  CAT_COMMAND,
  ADD_COMMAND,
  FIRST_COMMAND_PARAM
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
    default:
      console.log('Invalid input');
  }
  openReadLine();
}