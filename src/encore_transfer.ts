import { Context, Log, createJob } from '@osaas/client-core';
import { TransferConfig } from './config';
import path from 'path';

export interface EncoreJob {
  id: string;
  status: string;
  output?: Output[];
  inputs: EncoreInput[];
}

export interface Output {
  type: string;
  format: string;
  file: string;
  fileSize: number;
  overallBitrate: number;
  videoStreams?: { codec: string; bitrate: number }[];
  audioStreams?: { codec: string; bitrate: number; channels: number }[];
}

export interface EncoreInput {
  uri: string;
}

export class EncoreTransfer {
  constructor(private transferConfig: TransferConfig) {}

  async transfer(jobUrl: string) {
    const job = await this.getEncoreJob(jobUrl);
    if (job.output) {
      const outputFiles: Output[] = job.output?.filter(
        (file: Output) => file.type === 'VideoFile' || file.type === 'AudioFile'
      );
      const instanceUrl = new URL(jobUrl).origin;
      for (const file of outputFiles) {
        await transferFile(
          this.transferConfig.context,
          path.basename(file.file),
          new URL(file.file, instanceUrl),
          new URL(this.transferConfig.outputBucket),
          this.transferConfig.awsAccessKeyIdSecret,
          this.transferConfig.awsSecretAccessKeySecret
        );
      }
    } else {
      Log().warn('No output files found in Encore job');
      Log().debug(job);
    }
  }

  private async getEncoreJob(url: string): Promise<EncoreJob> {
    const sat = await this.transferConfig.context.getServiceAccessToken(
      'encore'
    );
    const jwtHeader: { 'x-jwt': string } | Record<string, never> = sat
      ? {
          'x-jwt': `Bearer ${sat}`
        }
      : {};
    const response = await fetch(url, {
      headers: { ...jwtHeader }
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch job from Encore, got status: ${response.status}`
      );
    }
    return (await response.json()) as EncoreJob;
  }
}

// This one could be moved to the client-transcode package
async function transferFile(
  ctx: Context,
  name: string,
  source: URL,
  destination: URL,
  awsAccessKeyIdSecret: string,
  awsSecretAccessKeySecret: string
) {
  const transferToken = await ctx.getServiceAccessToken(
    'eyevinn-docker-retransfer'
  );
  const encoreToken = await ctx.getServiceAccessToken('encore');
  const job = await createJob(ctx, 'eyevinn-docker-retransfer', transferToken, {
    name,
    awsAccessKeyId: `{{secrets.${awsAccessKeyIdSecret}}}`,
    awsSecretAccessKey: `{{secrets.${awsSecretAccessKeySecret}}}`,
    cmdLineArgs: `--sat ${encoreToken} ${source.toString()} ${destination.toString()}`
  });
  Log().info(
    `Created transfer job ${
      job.name
    }: ${source.toString()} to ${destination.toString()}`
  );
}
