import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
  console.log('setupServer IS OK');
};

bootstrap();
