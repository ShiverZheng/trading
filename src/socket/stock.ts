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
  async gotMessage() {
    const res = this.stockService.getPrice();
    return res;
  }
}
