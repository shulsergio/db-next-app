import cors from 'cors';
import express from 'express';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';

const allowedOrigins = [
  'http://new-next-project-sand.vercel.app',
  'https://new-next-project-sand.vercel.app',
  'http://localhost:4000',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());

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
  console.log('***** CONSOLE - SERVER - IS OK');
  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
