const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  // Obtener el token de los encabezados de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer "

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;