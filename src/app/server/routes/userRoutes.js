const {login, register, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userControllers");
const { checkUser } = require("../middlewares/userMiddleware");
const {userCreateValidation} = require("../middlewares/userValidations")

const router = require("express").Router();

router.post("/", checkUser);
router.post("/login", login);
router.post("/users", userCreateValidation(), register);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", userCreateValidation(), updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
