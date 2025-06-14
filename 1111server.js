// import cors from 'cors';
// import express from 'express';
// import router from './src/routers/index.js';
// import cookieParser from 'cookie-parser';
// import { env } from './src/utils/env.js';
// // import pino from 'pino-http';

// const allowedOrigins = ['http://localhost:4000', 'http://localhost:3000'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

// export const setupServer = () => {
//   const app = express();
//   // const PORT = process.env.PORT || 3000;
//   app.use(cors(corsOptions));
//   app.use(express.json());
//   app.use(cookieParser());

//   app.get('/', (req, res) => {
//     res.json({ message: 'all is ok' });
//   });
//   console.log('***** CONSOLE - SERVER - IS OK');
//   app.use(router);

//   const port = Number(env('PORT', 3000));
//   app.listen(port, () => console.log(`Server is running on ${port}`));
// };
