import { runApp } from 'ice';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    baseURL: 'http://127.0.0.1:7001',
  },
};
runApp(appConfig);
