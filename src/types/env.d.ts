declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_URI: string;
      COOKIE_SECRET: string;
      NODE_ENV: string;
    }
  }
}

export {};
