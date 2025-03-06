const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// Usar Helmet para seguridad, incluyendo política de contenido
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], 
      scriptSrc: ["'self'"],   
      styleSrc: ["'self'"],    
    },
  },
}));

// Configuración de CORS
app.use(cors());

// Limitar las solicitudes a 100 por minuto por IP
const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Middleware para anonimizar IP antes de procesar las solicitudes
app.use((req, res, next) => {
  req.anonymizedIp = anonymizeIp(req.ip);
  next();
});

// Función para anonimizar la IP (trunca los últimos dos octetos)
function anonymizeIp(ip) {
  const parts = ip.split('.');
  parts[2] = '0';
  parts[3] = '0';
  return parts.join('.');
}

// Importar y usar las rutas de la API
const stockRoutes = require('./routes/api');
app.use('/api', stockRoutes);

// Servidor corriendo en el puerto 3000
app.listen(3000, () => {
  console.log('✅ Server running on port 3000');
});
