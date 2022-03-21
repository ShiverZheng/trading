const boa = require('@pipcook/boa');
const os = boa.import('os');
console.log(os.getpid()); // prints the pid from python.

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

    // using bult-in functions
    const { range, len } = boa.builtins();
    const list = range(0, 10); // create a range array
    console.log(len(list)); // 10
    console.log(list[2]); // 2

    return list[2];
  }
}
