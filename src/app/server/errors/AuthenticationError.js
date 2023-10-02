const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "incorrect email") {
        errors.email = "Email está incorreto!";
    }

    if (err.message === "incorrect password") {
        errors.password = "Senha está incorreta!";
    }

    if (err.code === 11000) {
        errors.email = "Email já registrado!";
        return errors;
    }


    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

module.exports = { handleErrors };
