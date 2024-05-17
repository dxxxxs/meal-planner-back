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
                diet: params.diet || 'balanced',
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

// Función para guardar una receta
exports.saveRecipe = async (req, res) => {
    try {
        const recipeData = req.body;

        const existingRecipe = await Recipe.findOne({ name: recipeData.name });
        if (existingRecipe) {
            return res.status(409).json({ message: 'La receta ya existe' });
        }


        const newRecipe = new Recipe(recipeData);


        await newRecipe.save();


        res.status(201).json({ message: 'Receta guardada exitosamente' });
    } catch (error) {

        res.status(500).json({ error: 'Ocurrió un error al guardar la receta', details: error.message });
    }
};

exports.likeRecipe = async (req, res) => {
    try {
        const { username, recipeData } = req.body;

        let recipe = await Recipe.findOne({ label: recipeData.label });
        if (!recipe) {

            recipe = new Recipe(recipeData);
            await recipe.save();
            recipe = await Recipe.findOne({ label: recipeData.label });
        }


        const user = await User.findById(username);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }


        const recipeIndex = user.likes.indexOf(recipe._id);
        if (recipeIndex !== -1) {

            user.likes.splice(recipeIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Receta eliminada de los likes del usuario' });
        } else {
            user.likes.push(recipe._id);
            await user.save();
            return res.status(200).json({ message: 'Receta añadida a los likes del usuario exitosamente' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar modificar los likes del usuario', details: error.message });
    }
};