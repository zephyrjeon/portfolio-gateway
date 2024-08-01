import 'reflect-metadata';
import { AppServer } from './server';
import { getAppConfigs } from './configs/getAppConfigs';

const startServer = async () => {
  const configs = getAppConfigs();
  console.log('Configs: ', configs);
  const server = new AppServer(configs);

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
