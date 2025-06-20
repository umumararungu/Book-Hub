const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const setupSwagger = require('./swagger/swagger');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Swagger
setupSwagger(app);

module.exports = app;
