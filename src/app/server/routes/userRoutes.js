const {login, register, getAllUsers, getUserById, updateUser, deleteUser,getUserByPhone, passwordUser } = require("../controllers/userControllers");
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
router.get('/user/celular/:celular', getUserByPhone);
router.put('/resetaSenha/:id', passwordUser);



module.exports = router;
