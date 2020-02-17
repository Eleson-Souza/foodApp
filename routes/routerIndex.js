const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const produtoController = require('../controllers/produtoController');
const imageMiddleware = require('../middlewares/imageMiddleware');

router.get('/', homeController.home);

router.get('/cadastro', produtoController.cadastro);
router.post('/cadastro', 
    imageMiddleware.upload,
    imageMiddleware.resize,
    produtoController.cadastroAction
);

router.get('/editar/:id', produtoController.editar);
router.post('/editar/:id', 
    imageMiddleware.upload,
    imageMiddleware.resize,
    produtoController.editarAction
);

router.get('/apagar/:id', produtoController.apagar);

module.exports = router;