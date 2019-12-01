const express = require('express')
const router = express.Router()

const customMdw = require('../middleware/custom');
const controlador = require('../controllers/user');

router.post('/login', controlador.login);
router.post('/register', controlador.register);

module.exports = router
