import env from './config/env';   // подключение переменные окружения
// import dotenv from 'dotenv'; // подключение библиотеки переменных окружения чтобы брать значения с файла .env
import connectDB from './config/db'; // 
const express = require('express'); // подключение библиотеки express
const app = express();
const { celebrate, Joi, errors } = require('celebrate'); // подключение библиотеки для валидации данных
const cors = require('cors');
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.routes';
import { projectRouter } from './routes/project.routes';
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173'
];

// dotenv.config(); // мне кажется это лишнее

connectDB(); // подключение монгоДБ
app.use(cors(allowedOrigins));

app.listen(env.PORT, () => {
  console.log(`app listening on port - ${env.PORT}`)
})
app.use(express.json()); // Парсинг JSON‑запросов
app.use(express.urlencoded({ extended: true })); // Парсинг URL‑encoded‑форм (с поддержкой вложенных объектов)
app.use(authRouter); // подключение маршрутов
app.use(projectRouter); // подключение маршрутов

app.use(errorMiddleware);
