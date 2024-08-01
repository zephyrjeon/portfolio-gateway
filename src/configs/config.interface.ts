export interface IServerConfigs extends IServerBaseConfigs, IJWTConfigs {}

export interface IServerBaseConfigs {
  PORT: number;
  COOKIE_SECRET: string;
}

export interface IJWTConfigs {
  JWT_SECRET: string;
  JWT_EXPERATION_TIME: number;
}
