import {
  WSController,
  OnWSMessage,
  Provide,
  OnWSConnection,
  Inject,
  WSEmit,
} from '@midwayjs/decorator';
import { Context } from '@midwayjs/socketio';
import { BoaService } from '../service/boa';
import { SocketRequestEvent, SocketResponseEvent } from '../interface';

@Provide()
@WSController('/')
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @Inject()
  boaService: BoaService;

  @OnWSConnection()
  async onConnectionMethod() {
    console.log('on client connect', this.ctx.id);
  }

  @OnWSMessage(SocketRequestEvent.GREET)
  @WSEmit(SocketResponseEvent.GREET)
  async gotMessage(data1, data2, data3) {
    console.log('go message');
    console.log(this.boaService.test());
    return {
      name: 'harry',
      result: data1 + data2 + data3,
    };
  }
}
