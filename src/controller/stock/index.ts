import { Controller, Get, Inject, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Stock, { Unit } from '@/service/Stock';

@Controller('/stock')
export class HomeController {
  @Inject()
  stockService: Stock;

  @Inject()
  ctx: Context;

  @Get('/price')
  async getPrice(
    @Query('code') code: string,
    @Query('startAt') startAt: string,
    @Query('endAt') endAt: string
  ) {
    return await this.stockService.getPrice(code, startAt, endAt);
  }

  @Get('/bars')
  async getBars() {
    return await this.stockService.getBars(['000002.XSHE'], 2, Unit['1M']);
  }
}
