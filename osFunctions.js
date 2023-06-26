import {
  EOL,
  cpus,
  homedir,
  userInfo
} from 'os';
import {
  EOL_PARAM,
  CPUS_PARAM,
  HOMEDIR_PARAM,
  USERNAME_PARAM,
  ARCHITECTURE_PARAM
} from "./constants.js";


const osParamsArray = [
  EOL_PARAM,
  CPUS_PARAM,
  HOMEDIR_PARAM,
  USERNAME_PARAM,
  ARCHITECTURE_PARAM
];

export const osInfo = (params) => {
  if (!params.every((param) => osParamsArray.includes((param.slice(2))))) {
    return console.log('Invalid input');
  }

  params = Array.from(new Set(params))
    .map((param) => String(param).slice(2))
    .forEach((param) => {
      switch (param) {
        case EOL_PARAM:
          console.log(`Default system End-Of-Line: ${JSON.stringify(EOL)}`);
          break;
        case CPUS_PARAM:
          console.log('CPU info: ');
          console.log('Total cores: ', cpus().length);
          console.log('CPU cores info: ', cpus());
          break;
        case HOMEDIR_PARAM:
          console.log(`Home directory: ${homedir()}`);
          break;
        case USERNAME_PARAM:
          console.log(`System user name: ${userInfo().username}`);
          break;
        case ARCHITECTURE_PARAM:
          console.log(`CPU architecture: ${process.arch}`);
      }
    });
};