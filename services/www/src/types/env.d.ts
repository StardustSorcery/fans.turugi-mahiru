declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT?: string;
        CMS_URL?: string;
        CMS_PUBLIC_URL?: string;
        CMS_API_TOKEN?: string;
        NEXT_PUBLIC_CMS_PUBLIC_URL?: string;
      }
    }
  }
}
