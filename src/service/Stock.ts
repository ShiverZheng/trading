import * as boa from '@pipcook/boa';
import { Provide } from '@midwayjs/decorator';
import { getConfig } from '@/common/utils';

const os = boa.import('os');
// prints the pid from python.
console.log('pid: ', os.getpid());

const config = getConfig();

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

export enum Unit {
  '1m' = '1m',
  '5m' = '5m',
  '15m' = '15m',
  '30m' = '30m',
  '60m' = '60m',
  '120m' = '120m',
  '1d' = '1d',
  '1w' = '1w',
  '1M' = '1M',
}

@Provide()
export default class StockService {
  realtimePrice: Price[] = [];

  /**
   * @param code 000002.XSHE
   * @param startAt 2014-01-01
   * @param endAt 2014-1-03
   */
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

  async getBars(code: string[], count: number, unit: Unit) {
    const feilds = ['date', 'open', 'high', 'low', 'close', 'volume'];
    const res = jqdatasdk.get_bars(code, count, unit, feilds, true);
    const rows = res.itertuples();
    const formatedData: Price[] = [];
    for (const row of rows) {
      formatedData.push({
        timestamp: row[1],
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
