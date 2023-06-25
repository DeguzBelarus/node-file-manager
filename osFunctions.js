import {
  EOL,
  cpus,
  homedir
} from 'os';
import {
  EOL_PARAM,
  CPUS_PARAM,
  HOMEDIR_PARAM
} from "./constants.js";

export const osInfo = (param) => {
  switch (param) {
    case `--${EOL_PARAM}`:
      console.log(`EOL: ${JSON.stringify(EOL)}`);
      break;
    case `--${CPUS_PARAM}`:
      console.log('CPU cores info: ');
      console.log('Total cores: ', cpus().length);
      console.log('CPU cores info: ', cpus());
      break;
    case `--${HOMEDIR_PARAM}`:
      console.log(`Home directory: ${homedir()}`);
      break;
    default:
      console.log('Invalid input');
  }
};