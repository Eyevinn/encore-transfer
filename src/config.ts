import { Context } from '@osaas/client-core';

export interface Config {
  redis: RedisConfig;
  transfer: TransferConfig;
}

export interface RedisConfig {
  url: string;
  queueName: string;
}

export interface TransferConfig {
  outputBucket: string;
  context: Context;
  awsAccessKeyIdSecret: string;
  awsSecretAccessKeySecret: string;
}

function readRedisConfig(): RedisConfig {
  return {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    queueName: process.env.REDIS_QUEUE || 'transfer-queue'
  };
}

function readTransferConfig(): TransferConfig {
  if (!process.env.S3_OUTPUT) {
    throw new Error('Missing S3_OUTPUT environment variable');
  }
  const context = new Context();
  return {
    outputBucket: process.env.S3_OUTPUT,
    context,
    awsAccessKeyIdSecret:
      process.env.AWS_ACCESS_KEY_ID_SECRET || 'awsaccesskeyid',
    awsSecretAccessKeySecret:
      process.env.AWS_SECRET_ACCESS_KEY_SECRET || 'awssecretaccesskey'
  };
}

export function readConfig(): Config {
  return {
    redis: readRedisConfig(),
    transfer: readTransferConfig()
  };
}
