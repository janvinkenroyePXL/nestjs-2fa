import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface";
import * as fs from 'fs';

const httpsConfig: HttpsOptions = {
  pfx: fs.readFileSync('secrets/localhost.pfx'),
  passphrase: '5057',
}

export default httpsConfig;
