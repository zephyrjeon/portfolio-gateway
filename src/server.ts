import cors from 'cors';
import express from 'express';
import http from 'http';
import { rootServiceRoutes } from './routes/routes';

const SERVER_PORT = 3000;

export class AppServer {
  private httpServer: http.Server | null = null;
  private app = express();

  constructor(private configs: {} = {}) {
    // TODO
  }

  async startServer() {
    console.log('Starting up.....');

    this.useMiddlewares();
    this.useServiceRoutes();

    this.httpServer = this.app.listen({ port: SERVER_PORT }, () => {
      console.log(`🚀 Server ready at ${SERVER_PORT}`);
    });
  }

  async stop() {
    this.httpServer?.close?.();
  }

  private useMiddlewares() {
    // The default cors configuration is the equivalent of
    // {
    //   "origin": "*",
    //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   "preflightContinue": false,
    //   "optionsSuccessStatus": 204
    // }
    this.app.use(cors({}));
    this.app.use(express.json());
    // this.app.set('trust proxy', 1);
  }

  private useServiceRoutes() {
    rootServiceRoutes(this.app);
  }
}
