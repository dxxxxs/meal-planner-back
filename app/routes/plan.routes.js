const planController = require('../controllers/plan.controller');
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/planner',[verifyToken], planController.getPlanner);
    app.post('/api/planner', [verifyToken], planController.postPlanner);

};
