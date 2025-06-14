import cors from 'cors';
import express from 'express';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
// import pino from 'pino-http';

export const setupServer = () => {
  const app = express();
  // const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        'https://https://db-next-app.vercel.app', // Замени на свой домен фронтенда на Vercel
        'http://localhost:3000', // Для локальной разработки фронтенда
        'http://localhost:5000', // Если твой бэкенд локально запускается на 5000 (убери, когда полностью на Vercel)
      ],
      credentials: true, // Важно для куков и авторизационных заголовков
    }),
  );
  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );
  app.get('/', (req, res) => {
    res.json({ message: 'all is ok' });
  });
  console.log('***** CONSOLE - SERVER - IS OK');
  app.use(router);

  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });
};
