const axios = require('axios');
const db = require("../models");
const User = db.user;
const Recipe = db.recipe;

exports.getRecipes = async (req, res) => {
    try {
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: "public",
                app_id: "cb12cff7",
                app_key: "348cbb8aa7b403805e49c3747071fbb3",
                diet: 'balanced',
                random: true,
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la API de Edamam:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API de Edamam' });
    }
};

exports.getRecipesByMealType = async (req, res) => {
    try {
        const params = req.query;
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: "public",
                app_id: "cb12cff7",
                app_key: "348cbb8aa7b403805e49c3747071fbb3",
                random: true,
                mealType: params.mealType
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la API de Edamam:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API de Edamam' });
    }
}
exports.getRecipesByCuisineType = async (req, res) => {
    try {
        const params = req.query;
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: "public",
                app_id: "cb12cff7",
                app_key: "348cbb8aa7b403805e49c3747071fbb3",
                random: true,
                cuisineType: params.cuisineType
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error al llamar a la API de Edamam:', error);
        res.status(500).json({ error: 'Error al obtener datos de la API de Edamam' });
    }
}

// Función para verificar si una receta existe en la base de datos
async function recipeExists(recipeLabel) {
    let existingRecipe = await Recipe.findOne({ label: recipeLabel });
    if (existingRecipe) {
        return existingRecipe;
    }
    return false; // Devuelve true si la receta existe, false si no
}

// Función para verificar si una receta está en los likes del usuario
async function isRecipeInLikes(userId, recipeId) {
    const user = await User.findById(userId);
    if (!user) {
        return false;
    }
    return user.likes.includes(recipeId);
}

// Función principal para dar "like" a una receta
exports.likeRecipe = async (req, res) => {
    try {
        const { id, recipe } = req.body;

        // Verificar si la receta existe en la base de datos
        let existingRecipe = await Recipe.findOne({ label: recipe.label });

        // Si la receta no existe, guárdala en la base de datos
        if (!existingRecipe) {
            existingRecipe = new Recipe(recipe);
            await existingRecipe.save();
        }

        // Verificar si la receta está en los likes del usuario
        const isLiked = await isRecipeInLikes(id, existingRecipe._id);

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (isLiked) {
            user.likes.pull(existingRecipe._id);
            await user.save();
            return res.status(200).json({ message: 'Recipe removed from user likes' });
        } else {
            user.likes.push(existingRecipe._id);
            await user.save();
            return res.status(200).json({ message: 'Recipe added to user likes successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while modifying user likes', details: error.message });
    }
};

exports.recipeInLikes = async (req, res) => {
    try {
        const { id, recipeLabel } = req.query; // Utilizamos req.query para obtener los parámetros de la consulta

        const existingRecipe = await recipeExists(recipeLabel);
        let isLiked = false;
        if (existingRecipe) {
            isLiked = await isRecipeInLikes(id, existingRecipe._id);
        }
        return res.status(200).json({ isLiked });

    } catch (error) {
        res.status(500).json({ error: 'An error occurred while checking recipe likes', details: error.message });
    }
};