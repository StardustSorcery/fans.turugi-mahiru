declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        CMS_URL?: string;
        CMS_API_TOKEN?: string;
      }
    }
  }
}
