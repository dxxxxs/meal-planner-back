const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recipe.controller');

router.get('/api/food/autocomplete', recetasController.getRecipes);

module.exports = router;