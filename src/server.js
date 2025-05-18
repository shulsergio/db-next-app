import cors from 'cors';
import express from 'express';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/', (req, res) => {
    res.json({ message: 'all is ok' });
  });

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
