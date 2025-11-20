const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'sales_db',
  process.env.DB_USER || 'sales_user',
  process.env.DB_PASS || 'sales_pass',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL conectado exitosamente');
    
    // Importar modelos para que se registren
    require('../models/Sale');
    
    await sequelize.sync({ force: false, alter: true });
    console.log('Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('Error de conexión a PostgreSQL:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
