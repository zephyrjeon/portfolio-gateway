import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Fetch } from '../../services/Fetch';
import { appConfigs } from '../../configs/getAppConfigs';

export class PortfolioAuthController {
  static async health(req: Request, res: Response) {
    const response = await Fetch.get(`${getBasePath(1)}/health`);
    res.status(StatusCodes.OK).json(response);
  }

  static async signup(req: Request, res: Response) {
    console.log(13, req.body);
    const response = await Fetch.post(`${getBasePath(1)}/signup`, req.body);
    res.status(StatusCodes.OK).json(response);
  }
}

function getBasePath(v: number) {
  return `${appConfigs.PORTFOLIO_AUTH_URL}/api/v${v}`;
}
