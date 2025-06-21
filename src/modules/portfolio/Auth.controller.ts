import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Fetch } from '../../services/Fetch';
import { appConfigs } from '../../configs/getAppConfigs';
import { Auth } from '../../services/Auth';

export class PortfolioAuthController {
  static async health(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ response: 'ok!' });
  }

  static async signup(req: Request, res: Response) {
    const { body } = await Fetch.post(`${basePath(1)}/signup`, {
      body: req.body,
    });

    const token = await Auth.createToken({ accountId: body.id });
    Auth.setTokenInCookie(res, token);

    res.status(StatusCodes.OK).json(body);
  }

  static async signin(req: Request, res: Response) {
    const { body } = await Fetch.post(`${basePath(1)}/signin`, {
      body: req.body,
    });

    const token = await Auth.createToken({ accountId: body.id });
    Auth.setTokenInCookie(res, token);
    res.status(StatusCodes.OK).json(body);
  }

  static async signout(req: Request, res: Response) {
    Auth.clearTokenInCookie(res);
    res.status(StatusCodes.OK).json();
  }

  static async verifyEmail(req: Request, res: Response) {
    const { body } = await Fetch.post(`${basePath(1)}/verify-email`, {
      body: req.body,
      headers: { session: req.headers.session },
    });

    res.status(StatusCodes.OK).json(body);
  }

  static async sendEmailVerification(req: Request, res: Response) {
    const { body } = await Fetch.post(
      `${basePath(1)}/send-email-verification`,
      {
        body: req.body,
        headers: { session: req.headers.session },
      }
    );

    res.status(StatusCodes.OK).json(body);
  }

  static async resetPassword(req: Request, res: Response) {
    const { body } = await Fetch.post(`${basePath(1)}/reset-password`, {
      body: req.body,
      headers: { session: req.headers.session },
    });

    res.status(StatusCodes.OK).json(body);
  }

  static async changePassword(req: Request, res: Response) {
    const { body } = await Fetch.post(`${basePath(1)}/change-password`, {
      body: req.body,
      headers: { session: req.headers.session },
    });

    res.status(StatusCodes.OK).json(body);
  }
}

function basePath(v: number) {
  return `${appConfigs.PORTFOLIO_AUTH_URL}/api/v${v}`;
}
