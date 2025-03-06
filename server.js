const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const ipAnonymizer = require('ip-anonymizer'); // Para anonimizar las IPs

const app = express();

// Usar Helmet para seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors());

// Limitar las solicitudes a 100 por minuto por IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Usar tu ruta para manejar las solicitudes de stock
const stockRoutes = require('./routes/api');
app.use('/api', stockRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
