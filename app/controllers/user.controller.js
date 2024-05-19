const db = require("../models");
const User = db.user;
const Recipe = db.recipe; // Asegúrate de importar el modelo de Recipe

exports.getUserLikes = async (req, res) => {
  try {
    const { id, username, email } = req.query;

    // Buscar al usuario en la base de datos y poblar sus recetas favoritas
    const user = await User.findById(id).populate('likes');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver las recetas que ha dado like el usuario
    res.status(200).json({ userLikes: user.likes });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al obtener los likes del usuario', details: error.message });
  }
};
