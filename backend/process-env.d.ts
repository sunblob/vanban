declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      JWT_SECRET: string;
    }
  }
}

export {};
