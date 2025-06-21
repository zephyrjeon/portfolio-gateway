import express, { Router } from 'express';
import { PortfolioAuthController } from './Auth.controller';

export class PortfolioAuthRoutes {
  private static router = express.Router();

  static routes(): Router {
    this.router.get('/health', PortfolioAuthController.health);
    this.router.post('/signup', PortfolioAuthController.signup);
    this.router.post('/signin', PortfolioAuthController.signin);
    this.router.post('/signout', PortfolioAuthController.signout);
    this.router.post('/verify-email', PortfolioAuthController.verifyEmail);
    this.router.post(
      '/send-email-verification',
      PortfolioAuthController.sendEmailVerification
    );
    this.router.post('/reset-password', PortfolioAuthController.resetPassword);
    this.router.post(
      '/change-password',
      PortfolioAuthController.changePassword
    );

    return this.router;
  }
}
