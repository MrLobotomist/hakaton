const swaggerJsdoc = require('swagger-jsdoc');

// Swagger JSDoc опции
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'Описание моего API',
        },
    },
    // Файлы с описанием API
    apis: ['./routes/*.js'],
};

// Генерация спецификации Swagger
module.exports = swaggerJsdoc(options);