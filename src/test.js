/**
 * Prueba básica de las operaciones CRUD con Sequelize (SQLite en memoria).
 * Ejecutar: npm test
 */
process.env.DB_DIALECT = 'sqlite';
process.env.DB_STORAGE = ':memory:';

const sequelize = require('./config/database');
const Producto = require('./models/Producto');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✔ ${message}`);
    passed++;
  } else {
    console.error(`  ✘ ${message}`);
    failed++;
  }
}

async function run() {
  // Sincronizar esquema
  await sequelize.sync({ force: true });

  console.log('\n--- CRUD de Productos ---\n');

  // CREAR
  console.log('[1] Crear producto');
  const p1 = await Producto.create({
    nombre: 'Laptop',
    descripcion: 'Laptop de 15 pulgadas',
    precio: 999.99,
    stock: 10,
  });
  assert(p1.id > 0, 'Producto creado con ID asignado');
  assert(p1.nombre === 'Laptop', 'Nombre correcto');
  assert(Number(p1.precio) === 999.99, 'Precio correcto');

  const p2 = await Producto.create({ nombre: 'Mouse', precio: 29.99, stock: 50 });
  assert(p2.id > 0, 'Segundo producto creado');

  // LISTAR
  console.log('\n[2] Listar productos');
  const lista = await Producto.findAll();
  assert(lista.length === 2, 'Lista contiene 2 productos');

  // OBTENER POR ID
  console.log('\n[3] Obtener producto por ID');
  const encontrado = await Producto.findByPk(p1.id);
  assert(encontrado !== null, 'Producto encontrado por ID');
  assert(encontrado.nombre === 'Laptop', 'Nombre coincide');

  // ACTUALIZAR PARCIALMENTE (solo precio)
  console.log('\n[4b] Actualizar parcialmente (solo precio)');
  const precioOriginal = Number(p1.precio);
  await p1.update({ precio: 799.99 });
  const parcial = await Producto.findByPk(p1.id);
  assert(Number(parcial.precio) === 799.99, 'Solo el precio se actualizó');
  assert(parcial.nombre === 'Laptop', 'Nombre no se borró en actualización parcial');

  // ACTUALIZAR
  console.log('\n[4] Actualizar producto');
  await p1.update({ precio: 899.99, stock: 8 });
  const actualizado = await Producto.findByPk(p1.id);
  assert(Number(actualizado.precio) === 899.99, 'Precio actualizado');
  assert(actualizado.stock === 8, 'Stock actualizado');

  // ELIMINAR
  console.log('\n[5] Eliminar producto');
  await p2.destroy();
  const despues = await Producto.findAll();
  assert(despues.length === 1, 'Queda 1 producto tras eliminar');
  const eliminado = await Producto.findByPk(p2.id);
  assert(eliminado === null, 'Producto eliminado no existe');

  console.log(`\nResultado: ${passed} prueba(s) pasadas, ${failed} fallida(s).\n`);
  await sequelize.close();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
