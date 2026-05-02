require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.routes');

const app = express();
app.use(express.json());

app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Endpoints disponibles:');
      console.log('  POST   /api/productos       - Crear producto');
      console.log('  GET    /api/productos       - Listar productos');
      console.log('  GET    /api/productos/:id   - Obtener producto');
      console.log('  PUT    /api/productos/:id   - Actualizar producto');
      console.log('  DELETE /api/productos/:id   - Eliminar producto');
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err.message);
    process.exit(1);
  });

module.exports = app;
