const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

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

// Función para anonimizar la IP
function anonymizeIp(ip) {
  const parts = ip.split('.');
  // Truncamos los dos últimos octetos para anonimizar
  parts[2] = '0';
  parts[3] = '0';
  return parts.join('.');
}

// Ruta de ejemplo para capturar IP y anonimizarla
app.get('/some-route', (req, res) => {
  const ip = req.ip; // Obtén la IP del cliente
  const anonymizedIp = anonymizeIp(ip); // Anonimiza la IP antes de almacenarla
  console.log(`IP Anonimizada: ${anonymizedIp}`);
  res.send(`Tu IP anonimizada es: ${anonymizedIp}`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
