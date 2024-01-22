declare namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;

    readonly COGNITO_ISSUER: string;
    readonly COGNITO_CLIENT_ID: string;
    readonly COGNITO_CLIENT_SECRET: string;
  }
}
