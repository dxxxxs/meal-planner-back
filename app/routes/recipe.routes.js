const recetasController = require('../controllers/recipe.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/recipes', recetasController.getRecipes);
    app.get('/api/recipes/bymealtype', recetasController.getRecipesByMealType);
    app.get('/api/recipes/bycuisinetype', recetasController.getRecipesByCuisineType);
    app.get('/api/recipes/likeRecipe', recetasController.likeRecipe);
    app.get('/api/recipes/saveRecipe', recetasController.saveRecipe);
};
