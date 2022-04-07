import {
  WSController,
  OnWSMessage,
  Provide,
  OnWSConnection,
  Inject,
  WSEmit,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio';
import StockService from '@/service/Stock';
import { SocketRequestEvent, SocketResponseEvent } from '@/interface';

@Provide()
@WSController('/')
export class StockSocketController {
  @Inject()
  ctx: Context;

  @Inject()
  stockService: StockService;

  @OnWSConnection()
  async onConnectionMethod() {
    console.log('on client connect', this.ctx.id);
  }

  @OnWSMessage(SocketRequestEvent.PRICE)
  @WSEmit(SocketResponseEvent.PRICE)
  async gotMessage(code: string, startAt: string, endAt: string) {
    // '000002.XSHE', '2014-01-01', '2014-1-03'
    const res = this.stockService.getPrice(code, startAt, endAt);
    return res;
  }
}
