import * as fs from 'fs';
import * as path from 'path';
import * as boa from '@pipcook/boa';
import { parse } from 'yaml';
import { Provide } from '@midwayjs/decorator';

const os = boa.import('os');
// prints the pid from python.
console.log(os.getpid());

const file = fs.readFileSync(path.join(__dirname, '../../config.yml'), 'utf-8');
const config = parse(file);

const jqdatasdk = boa.import('jqdatasdk');
jqdatasdk.auth(config.joinQuant.account, config.joinQuant.password);

type Record = { [key: string]: number };

export interface JoinQuotePrice {
  open: Record;
  close: Record;
  high: Record;
  low: Record;
  volume: Record;
  money: Record;
}

export interface Price {
  timestamp: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  money: number;
}

@Provide()
export default class StockService {
  async getPrice() {
    const res = jqdatasdk.get_price('000002.XSHE', '2014-01-01', '2014-1-03');
    const data = res.to_json() as JoinQuotePrice[];
    const formatedData: Price[] = [];
    const allTS = Object.keys(data['open']);
    for (const timestamp of allTS) {
      formatedData.push({
        timestamp,
        open: data['open'][timestamp],
        close: data['close'][timestamp],
        high: data['high'][timestamp],
        low: data['low'][timestamp],
        volume: data['volume'][timestamp],
        money: data['money'][timestamp],
      });
    }
    return formatedData;
  }
}
