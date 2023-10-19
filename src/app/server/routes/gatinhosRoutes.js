const express = require("express");
const router = express.Router();
const gatinhoController = require("../controllers/gatinhoController");

router.post("/gatos", gatinhoController.createGato);
router.get("/gatos", gatinhoController.getGatos);
router.put("/gatos/:id", gatinhoController.editGato);
router.delete("/gatos/:id", gatinhoController.deleteGato);

module.exports = router;