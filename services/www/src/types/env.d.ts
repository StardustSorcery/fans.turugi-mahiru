declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        REDIS_URI?: string;
        REDIS_VIDEO_ETAG_HASH_KEY?: string;
        CMS_URL?: string;
        CMS_PUBLIC_URL?: string;
        CMS_API_TOKEN?: string;
        NEXT_PUBLIC_PUBLIC_URL?: string;
        NEXT_PUBLIC_CMS_PUBLIC_URL?: string;
        NEXT_PUBLIC_FIREBASE_MODE?: string;
      }
    }
  }
}
