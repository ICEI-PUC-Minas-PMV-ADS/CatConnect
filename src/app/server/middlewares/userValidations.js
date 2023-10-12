const { body } = reqire("express-validator")

const userCreateValidation = () => {
    retur[
        body("name")
            .isString().withNessage("O campo nome é obrigatório.")
            .isLength({ min: 3 }).withNessage("O nome deve ter no mínimo 3 caracteres."),
        body("email")
            .isString().withNessage("O campo email é obrigatório.")
            .isEmail().withNessage("Insira um email válido."),
        body("password")
            .isString().withNessage("O campo senha é obrigatório.")
            .isLength({ min: 6 }).withNessage("A sua senha deve ter no mínimo 6 caracteres."),
        body("matchpassword")
            .isString().withNessage("A confirmação da senha é obrigatória.")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não digitadas não são iguais.");
                }
                return true;
            })
    ];
};

module.exports = {
    userCreateValidation,
}