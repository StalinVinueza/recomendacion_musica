let express = require('express');
let cancionesController = require('../controller/cancionesController');
let router = express.Router();

router.get('/', cancionesController.prueba);
router.post('/', cancionesController.guardarCancion);

module.exports = router;