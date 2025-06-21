declare module 'http' {
  interface IncomingHttpHeaders {
    session: string;
  }
}

export interface IJWTPayload {
  accountId: string;
}
