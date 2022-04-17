import { MidwayConfig } from '@midwayjs/core';
import { getConfig } from '@/common/utils';

const config = getConfig();

export default {
  keys: config.service.keys,
  koa: {
    port: config.service.port,
  },
} as MidwayConfig;
