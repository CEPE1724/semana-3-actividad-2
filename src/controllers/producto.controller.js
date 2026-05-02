const Producto = require('../models/Producto');

// Crear un producto
const crear = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    const producto = await Producto.create({ nombre, descripcion, precio, stock });
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar todos los productos
const listar = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
const obtener = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto
const actualizar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    const { nombre, descripcion, precio, stock } = req.body;
    const campos = {};
    if (nombre !== undefined) campos.nombre = nombre;
    if (descripcion !== undefined) campos.descripcion = descripcion;
    if (precio !== undefined) campos.precio = precio;
    if (stock !== undefined) campos.stock = stock;
    await producto.update(campos);
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un producto
const eliminar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crear, listar, obtener, actualizar, eliminar };
