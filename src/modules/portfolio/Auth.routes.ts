import express, { Router } from 'express';
import { PortfolioAuthController } from './Auth.controller';

export class PortfolioAuthRoutes {
  private static router = express.Router();

  static routes(): Router {
    this.router.get('/health', PortfolioAuthController.health);
    this.router.post('/signup', PortfolioAuthController.signup);

    return this.router;
  }
}
