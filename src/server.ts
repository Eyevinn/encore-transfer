import { Log } from '@osaas/client-core';
import api from './api';
import { readConfig } from './config';
import { RedisListener } from './redis_listener';
import { EncoreTransfer } from './encore_transfer';

async function main() {
  const config = readConfig();
  const server = api({ title: '@eyevinn/encore-transfer', config });

  const encoreTransfer = new EncoreTransfer(config.transfer);
  const redisListener = new RedisListener(config.redis, (message) => {
    return encoreTransfer.transfer(message.url);
  });
  const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

  server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      throw err;
    }
    Log().info(`Server listening on ${address}`);
    Log().info('Starting Redis listener');
    redisListener.start();
  });
}

export default main();
