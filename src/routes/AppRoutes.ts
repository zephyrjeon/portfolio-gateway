import { Application } from 'express';
import { PortfolioAuthRoutes } from '../modules/portfolio/Auth.routes';

export class AppRoutes {
  constructor(private app: Application) {}

  routes() {
    this.app.use(this.BASE_PATHS.PORTFOLIO_AUTH, PortfolioAuthRoutes.routes());
  }

  private gatewayPath(v: number) {
    return `/api/portfolio-gateway/v${v}`;
  }

  private BASE_PATHS = {
    PORTFOLIO_AUTH: this.gatewayPath(1) + '/portfolio-auth',
  };
}
