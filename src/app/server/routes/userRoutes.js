const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/usuarios", userController.createUser);
router.get("/usuarios", userController.getUser);
router.put("/usuarios/:id", userController.editUser);
router.delete("/usuarios/:id", userController.deleteUser);

module.exports = router;