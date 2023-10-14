const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusControllher');

// Rotas
router.post('/status', statusController.criarStatus);
router.get('/status', statusController.obterTodosStatus);

module.exports = router;
