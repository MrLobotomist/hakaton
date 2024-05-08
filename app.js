// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger')

const app = express();

// Мидлвары
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Подключение Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Подключение маршрутов
app.use('/api/auth', authRoutes);

// Главная страница
app.get('/', (req, res) => {
    res.send('Welcome to the Express API!');
});

// Проверяем соединение с базой данных
sequelize.authenticate()
    .then(() => {
        console.log('Успешное подключение к базе данных');
    })
    .catch(err => {
        console.error('Ошибка подключения к базе данных:', err);
    });

module.exports = app;