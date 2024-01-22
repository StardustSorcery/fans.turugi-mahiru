declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        CRON_RULE?: string;
        CMS_URL?: string;
        CMS_API_TOKEN?: string;
      }
    }
  }
}
