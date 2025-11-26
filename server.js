const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fetch = require('node-fetch');

const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todos los orígenes (puedes personalizarlo)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta demo para mostrar comunicación con el microservicio de usuarios
app.get('/api/sales/users-demo', async (req, res) => {
  try {
    const response = await fetch('https://microserviciousuario.azurewebsites.net/api/users');
    const data = await response.json();
    res.json({ origen: 'microservicio-usuarios', data });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo comunicar con el microservicio de usuarios', details: err.message });
  }
});

app.use('/api/sales', salesRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Microservicio de ventas activo',
    version: '1.0.0'
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
