import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  console.log('bootstrap called'); // Проверка вызова bootstrap
  await initMongoDB();
  console.log('called setupServer after bootstrap'); // Проверка вызова bootstrap
  setupServer();
  console.log('setupServer IS OK');
};

bootstrap();
