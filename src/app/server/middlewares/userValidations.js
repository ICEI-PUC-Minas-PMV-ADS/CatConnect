const { body } = require("express-validator")

const userCreateValidation = () => {
    return[
        body("nome")
            .isString().withMessage("O campo nome é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome deve ter no mínimo 3 caracteres."),
        body("email")
            .isString().withMessage("O campo email é obrigatório.")
            .isEmail().withMessage("Insira um email válido."),
        body("password")
            .isString().withMessage("O campo senha é obrigatório.")
            .isLength({ min: 6 }).withMessage("A sua senha deve ter no mínimo 6 caracteres."),
        body("matchpassword")
            .isString().withMessage("A confirmação da senha é obrigatória.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas digitadas não são iguais.");
                }
                return true;
            })
    ];
};

module.exports = {
    userCreateValidation,
}