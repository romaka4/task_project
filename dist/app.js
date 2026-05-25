"use strict";
const { PORT, JWT_SECRET, MONGO_URI } = require('./config/env');
const express = require('express');
const app = express();
const { celebrate, Joi, errors } = require('celebrate');
const connectDB = require('./config/db');
const cors = require('cors');
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173'
];
connectDB();
app.use(cors(allowedOrigins));
app.listen(PORT, () => {
    console.log(`app listening on port - ${PORT}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors());
