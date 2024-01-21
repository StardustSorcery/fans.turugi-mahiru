declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        YT_CHANNEL_ID?: string;
        SYNC_CRON_RULE?: string;
        RESYNC_CRON_RULE?: string;
        REDIS_URI?: string;
        REDIS_VIDEO_ETAG_HASH_KEY?: string;
        CMS_URL?: string;
        CMS_API_TOKEN?: string;
        GOOGLE_API_KEY?: string;
      }
    }
  }
}
