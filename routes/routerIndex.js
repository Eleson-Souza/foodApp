const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const produtoController = require('../controllers/produtoController');
const categoriasController = require('../controllers/categoriasController');
const carrinhoController = require('../controllers/carrinhoController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const pagamentoController = require('../controllers/pagamentoController');

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

router.post('/apagar', produtoController.apagar);
router.get('/categorias/:nomeCategoria', produtoController.buscarCategoria);
router.get('/busca/:texto', produtoController.buscarPorTexto);
router.get('/delivery/:id', produtoController.abrirProduto);
router.get('/comidas', produtoController.abrirTodosProdutos);

router.get('/categorias', categoriasController.categorias);
router.get('/categoria/nova', categoriasController.novaCategoria);
router.post('/categoria/nova', categoriasController.novaCategoriaAction);

router.post('/carrinho/novo', carrinhoController.novoCarrinho);
router.get('/carrinho', carrinhoController.abrirCarrinho);
router.post('/carrinho/deletar', carrinhoController.apagarItem);

router.get('/pagamento', pagamentoController.criarPagamento);
router.get('/finalizar-pagamento', pagamentoController.finalizarPagamento);

module.exports = router;