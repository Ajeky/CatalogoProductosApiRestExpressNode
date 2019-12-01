const express = require('express')
const router = express.Router()

const customMdw = require('../middleware/custom');
const controlador = require('../controllers/productos');

router.get('/', controlador.findAll);
router.get('/:id', controlador.findById);