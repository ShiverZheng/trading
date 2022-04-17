import {
  App,
  Inject,
  Provide,
  WSController,
  OnWSMessage,
  OnWSConnection,
  OnWSDisConnection,
  MidwayFrameworkType,
} from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/socketio';
import StockService, { Unit } from '@/service/Stock';
import {
  SocketRequestEvent,
  SocketResponseEvent,
} from '@/common/models/messages';

@Provide()
@WSController('/')
export class StockSocketController {
  private clientWithCode: Map<string, string> = new Map();

  private timer: NodeJS.Timer;

  @Inject()
  ctx: Context;

  @App(MidwayFrameworkType.WS_IO)
  app: Application;

  @Inject()
  stockService: StockService;

  @OnWSConnection()
  async onConnectionMethod() {
    this.timer = setInterval(() => this.syncRealtimePrice(), 10 * 1000);
  }

  async syncRealtimePrice() {
    const ids = await this.app.allSockets();
    for (const id of ids) {
      const code = this.clientWithCode.get(id);
      if (code) {
        const data = await this.stockService.getBars([code], 1, Unit['1m']);
        this.app.to(id).emit(SocketResponseEvent.PRICE, data);
      }
    }
  }

  @OnWSDisConnection()
  onWSDisConnectionMethod() {
    this.clientWithCode.delete(this.ctx.id);
    if (!this.clientWithCode.size) {
      clearInterval(this.timer);
    }
  }

  @OnWSMessage(SocketRequestEvent.PRICE)
  async realtimePrice(code: string) {
    this.clientWithCode.set(this.ctx.id, code);
  }
}
