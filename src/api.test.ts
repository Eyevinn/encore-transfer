import { Context } from '@osaas/client-core';
import api from './api';

describe('api', () => {
  it('responds with hello, world!', async () => {
    const config = {
      redis: {
        url: 'redis://localhost:6379',
        queueName: 'transfer-queue'
      },
      transfer: {
        outputBucket: 'my-bucket',
        context: new Context({ personalAccessToken: 'dummy' }),
        awsAccessKeyIdSecret: 'dummy',
        awsSecretAccessKeySecret: 'dummy'
      }
    };
    const server = api({ title: 'my awesome service', config });
    const response = await server.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello, world! I am my awesome service');
  });
});
