import { initMongoDB } from './db/initMongoDB.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Убедись, что путь к твоему роутеру правильный относительно этого файла
import router from './routers/index.js'; // Например, если 'routers' находится в той же папке 'api'
const app = express();

// 2. НАСТРОЙКИ CORS (БЕЗ ФУНКЦИИ-ОБЕРТКИ)
const allowedOrigins = [
  'http://localhost:4000', // Для локальной отладки фронтенда
  'http://localhost:3000', // Для локальной отладки фронтенда
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// --- 3. ПРИМЕНЯЕМ ВСЕ MIDDLEWARE И РОУТЫ ПРЯМО К APP ---
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Middleware для подключения к базе данных
// Это гарантирует, что подключение будет установлено (или переиспользовано) при каждом запросе
app.use(async (req, res, next) => {
  try {
    await initMongoDB(); // Вызываем функцию подключения к БД
    console.log(
      'MongoDB: Подключение установлено/переиспользовано для запроса.',
    );
    next(); // Передаем управление следующему middleware/роутеру
  } catch (error) {
    console.error('Ошибка в middleware подключения к БД:', error);
    res.status(500).json({
      message: 'Ошибка сервера: не удалось подключиться к базе данных.',
    });
  }
});

// Простой роут для проверки работы API
app.get('/', (req, res) => {
  res.json({ message: 'API is running on Vercel!' });
});

console.log(
  '***** VERCEL API - APP IS BEING INITIALIZED (при холодном старте)',
);

app.use(router); // Подключаем твой основной роутер

// --- 4. УДАЛЯЕМ app.listen() и функцию setupServer() ---
// Они не нужны и не будут работать в бессерверной среде Vercel.

// --- 5. ЭКСПОРТИРУЕМ ПОЛНОСТЬЮ НАСТРОЕННЫЙ APP В КОНЦЕ ФАЙЛА ---
export default app;
