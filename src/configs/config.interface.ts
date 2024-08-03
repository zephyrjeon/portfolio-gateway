export interface IAppConfigs extends IBaseConfigs, IJWTConfigs {}

export interface IBaseConfigs {
  PORT: number;
  COOKIE_SECRET: string;
}

export interface IJWTConfigs {
  JWT_SECRET: string;
  JWT_EXPERATION_TIME: number;
}
