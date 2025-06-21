import { CookieOptions, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IJWTPayload } from '../interfaces/interfaces';
import { appConfigs } from '../configs/getAppConfigs';

export const TOKEN = 'TOKEN';

export class Auth {
  static async signJWT(
    payload: string | Buffer | object,
    secret: jwt.Secret,
    options: jwt.SignOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (token) {
          resolve(token);
        } else {
          reject(err || 'Unknown JWT sign error');
        }
      });
    });
  }

  static async verifyJWT(token: string, secret: jwt.Secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if (payload) {
          resolve(payload);
        } else {
          reject(err || 'Unknown JWT verify error');
        }
      });
    });
  }

  static async createToken(payload: IJWTPayload) {
    return this.signJWT(payload, appConfigs.JWT_SECRET, {
      expiresIn: appConfigs.JWT_EXPERATION_TIME,
    });
  }

  static setTokenInCookie(
    res: Response,
    token: string,
    options: CookieOptions = {
      signed: true,
      secure: true, // inaccessible to JavaScript
      httpOnly: true, // only sent to the server with an encrypted request over the HTTPS protocol.
      maxAge: 24 * 60 * 60 * 1000,
    }
  ) {
    return res.cookie(TOKEN, token, options);
  }

  static clearTokenInCookie(res: Response) {
    return res.clearCookie(TOKEN);
  }
}
