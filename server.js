const express = require('express');
require('dotenv').config();


const salesRoutes = require('./routes/salesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
