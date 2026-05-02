const { Router } = require('express');
const {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
} = require('../controllers/producto.controller');

const router = Router();

router.post('/', crear);       // Crear
router.get('/', listar);       // Listar
router.get('/:id', obtener);   // Obtener por ID
router.put('/:id', actualizar); // Actualizar
router.delete('/:id', eliminar); // Eliminar

module.exports = router;
