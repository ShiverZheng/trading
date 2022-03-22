import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';

const file = fs.readFileSync(path.join(__dirname, '../../config.yml'), 'utf-8');
const config = parse(file);
console.log(config);

const boa = require('@pipcook/boa');
const os = boa.import('os');
console.log(os.getpid()); // prints the pid from python.

const jqdatasdk = boa.import('jqdatasdk');
jqdatasdk.auth(config.joinQuant.account, config.joinQuant.password);

import { Provide } from '@midwayjs/decorator';

@Provide()
export class BoaService {
  async test() {
    // using keyword arguments namely `kwargs`
    // os.makedirs(
    //   '..',
    //   boa.kwargs({
    //     mode: 0x777,
    //     exist_ok: false,
    //   })
    // );

    const res = jqdatasdk.get_price('000001.XSHE', '2017-01-01', '2017-12-31');
    console.log(res);
    // using bult-in functions
    const { range, len } = boa.builtins();
    const list = range(0, 10); // create a range array
    console.log(len(list)); // 10
    console.log(list[2]); // 2

    return list[2];
  }
}
