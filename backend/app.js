const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Ajustes (nombre y puerto)
app.set('puerto', process.env.PORT || 3000);
app.set('nombreApp', 'Gestión de empleados');

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:4200' })); // permite Angular local
app.use(express.json());

// Rutas del API
app.use('/api/empleados', require('./src/routes/empleados.routes'));

module.exports = app;
