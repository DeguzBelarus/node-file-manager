import {
  EOL,
  cpus
} from 'os';
import {
  EOL_PARAM,
  CPUS_PARAM
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
    default:
      console.log('Invalid input');
  }
};