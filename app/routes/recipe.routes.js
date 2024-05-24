const recetasController = require('../controllers/recipe.controller');
const { verifyToken } = require("../middlewares/authJwt");

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
    app.get('/api/recipes/bytext', recetasController.getRecipesByText);
    app.get('/api/recipes/bycuisinetype', recetasController.getRecipesByCuisineType);
    app.post('/api/recipes/likeRecipe', [verifyToken], recetasController.likeRecipe);
    app.get('/api/recipes/recipeInLikes', recetasController.recipeInLikes);
    app.post('/api/recipes/saveRecipe', recetasController.saveRecipe);
    app.get('/api/recipes/recipeById', recetasController.recipeById);
};
