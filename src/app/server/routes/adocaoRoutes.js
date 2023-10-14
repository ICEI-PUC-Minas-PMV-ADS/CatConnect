const express = require('express');
const router = express.Router();
const adocaoController = require('../controllers/adocaoController');


router.post('/adocoes', adocaoController.criarAdocao);
router.get('/adocoes', adocaoController.obterTodasAdocoes);
router.get('/adocoes/:id', adocaoController.obterAdocaoPorId);
router.put('/adocoes/:id', adocaoController.atualizarAdocao);
router.delete('/adocoes/:id', adocaoController.excluirAdocao);

module.exports = router;
