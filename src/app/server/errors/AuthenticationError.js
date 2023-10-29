const handleErrors = (err) => {
    let errors = {
        email: "",
        password: "",
        user: "",
        token: ""
    };

    if (err.message === "incorrect email") {
        errors.email = "Email está incorreto!";
    }

    if (err.message === "incorrect password") {
        errors.password = "Senha está incorreta!";
    }

    // if (err.code === 11000) {
    //     errors.email = "Email já registrado!";
    //     return errors;
    // }
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        errors.email = "E-mail já cadastrado!";
        return errors;
      }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.message === "User not found") {
        errors.user = "Usuário não encontrado!";
    }

    if (err.message === "jwt expired") {
        errors.token = "Sessão expirada, por favor faça login novamente!";
    }

    if (err.message === "jwt malformed") {
        errors.token = "Token inválido, faça login novamente!";
    }

    return errors;
};

module.exports = { handleErrors };
