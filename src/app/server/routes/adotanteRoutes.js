const express = require("express");
const router = express.Router();
const adotanteController = require("../controllers/adotanteController");

router.post("/adotantes", adotanteController.createAdotante);
router.get("/adotantes", adotanteController.getAdotante);
router.put("/adotantes/:id", adotanteController.editAdotante);
router.delete("/adotantes/:id", adotanteController.deleteAdotante);
router.get('/adotantes/:cpf', adotanteController.obterAdotantesPorCpf);

module.exports = router;