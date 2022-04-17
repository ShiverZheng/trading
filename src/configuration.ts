import { join } from 'path';
import * as Koa from '@midwayjs/koa';
import * as info from '@midwayjs/info';
import * as SocketIO from '@midwayjs/socketio';
import { Configuration, App } from '@midwayjs/decorator';
import { DefaultErrorFilter } from './filter/default.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  conflictCheck: true,
  imports: [
    Koa,
    SocketIO,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: Koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([DefaultErrorFilter]);
  }
}
