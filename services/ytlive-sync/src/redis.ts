import * as redis from 'redis';

export const keys = {
  videoEtagHash: process.env.REDIS_VIDEO_ETAG_HASH_KEY || 'ytlive-sync:video-etag-hash',
};

export function init(): redis.RedisClientType<any, any, any> {
  const client = redis.createClient({ url: process.env.REDIS_URI });
  return client;
}

export async function connect(client: redis.RedisClientType<any, any, any>): Promise<redis.RedisClientType<any, any, any>> {
  if(client.isReady) return client;
  return await client.connect().then(() => client);
}
