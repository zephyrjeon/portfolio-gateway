import {
  IJWTConfigs,
  IServerBaseConfigs,
  IServerConfigs,
} from './config.interface';

const BASE_CONFIGS: IServerBaseConfigs = {
  PORT: 3000,
  COOKIE_SECRET: process.env.COOKIE_SECRET!,
};

const JWT_CONFIGS: IJWTConfigs = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPERATION_TIME: 24 * 60 * 60,
};

export const COMMON_SERVER_CONFIGS: IServerConfigs = Object.assign(
  {},
  BASE_CONFIGS,
  JWT_CONFIGS
);
