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
  money?: number;
}

@Provide()
export default class StockService {
  async getPrice(code: string, startAt: string, endAt: string) {
    const res = jqdatasdk.get_price(code, startAt, endAt);
    const rows = res.itertuples();
    const formatedData: Price[] = [];
    for (const row of rows) {
      formatedData.push({
        timestamp: row[0],
        open: row['open'],
        close: row['close'],
        high: row['high'],
        low: row['low'],
        volume: row['volume'],
      });
    }
    return JSON.stringify(formatedData);
  }
}
