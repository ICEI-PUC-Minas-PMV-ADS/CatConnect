const {login, register, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");
const {userCreateValidation} = require("../middlewares/userValidations")

const router = require("express").Router();

router.post("/", checkUser);
router.post("/login", login);
router.post('/register', userCreateValidation(), register);
router.get('/users', checkUser, getAllUsers);
router.get('/users/:id', checkUser, getUserById);
router.put('/users/:id', checkUser, userCreateValidation(), updateUser);
router.delete('/users/:id', checkUser, deleteUser);

module.exports = router;
