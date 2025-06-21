import { NextFunction, Request, Response } from 'express';
import { appConfigs } from '../configs/getAppConfigs';
import { Auth, TOKEN } from '../services/Auth';
import { IJWTPayload } from '../interfaces/interfaces';

export async function setSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.signedCookies[TOKEN];

  if (token) {
    const payload = await Auth.verifyJWT(token, appConfigs.JWT_SECRET);
    req.headers.session = JSON.stringify(payload as IJWTPayload);
  } else {
    req.headers.session = '';
  }

  next();
}
