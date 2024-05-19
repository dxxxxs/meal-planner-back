const mongoose = require("mongoose");

// Definir el esquema de Recipe
const recipeSchema = new mongoose.Schema({
    label:String
}, { strict: false });

// Crear el modelo de Recipe
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;