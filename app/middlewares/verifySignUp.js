const db = require("../models");
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Username, email or password missing in request body." });
  }

  // Validar longitud del nombre de usuario (entre 3 y 20 caracteres)
  if (req.body.username.length < 3 || req.body.username.length > 20) {
    return res.status(400).send({ message: "Username must be between 3 and 20 characters." });
  }

  // Validar formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({ message: "Invalid email format." });
  }

  // Validar longitud de la contraseña (mínimo 6 caracteres)
  if (req.body.password.length < 6) {
    return res.status(400).send({ message: "Password must be at least 6 characters long." });
  }

  // Verificar si el nombre de usuario ya existe
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (user) {
      return res.status(400).send({ message: "Username is already in use." });
    }

    // Verificar si el correo electrónico ya existe
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }
      if (user) {
        return res.status(400).send({ message: "Email is already in use." });
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
