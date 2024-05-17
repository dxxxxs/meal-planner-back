const db = require("../models");
const User = db.user;
const Recipe = db.recipe; // Asegúrate de importar el modelo de Recipe

exports.getUserLikes = async (req, res) => {
  try {
    const userId = req.userId; // ID del usuario obtenido del token JWT

    // Buscar al usuario en la base de datos y poblamos sus recetas favoritas
    const user = await User.findById(userId).populate('likes');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener solo los detalles de las recetas (sin IDs)
    const userLikes = user.likes.map(like => like.toObject());

    // Devolver las recetas que ha dado like el usuario
    res.status(200).json({ userLikes });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los likes del usuario', details: error.message });
  }
};