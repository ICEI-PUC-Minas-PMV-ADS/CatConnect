const express = require("express");
const router = express.Router();
const adotanteController = require("../controllers/adotanteController");

router.post("/adotantes", adotanteController.createAdotante);
router.get("/adotantes", adotanteController.getAdotante);
router.put("/adotantes/:id", adotanteController.editAdotante);
router.delete("/adotantes/:id", adotanteController.deleteAdotante);
router.get('/adotantes/:cpf', adotanteController.obterAdotantesPorCpf);
router.get('/adotantesId/:id', adotanteController.obterAdotantesPorId);
router.get('/detalhes-adotante-adocao/:id', adotanteController.detalhesAdotanteAdocao);

module.exports = router;