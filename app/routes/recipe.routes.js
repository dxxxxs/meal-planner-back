const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recipe.controller');

router.get('/api/recipes', recetasController.getRecipes);
router.get('/api/recipes/by-meal-type', recetasController.getRecipesByMealType);
router.get('/api/recipes/likeRecipe', recetasController.likeRecipe);
router.get('/api/recipes/saveRecipe', recetasController.saveRecipe);

module.exports = router;