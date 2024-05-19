const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.recipe = require("./recipe.model");
// db.recipe = require("./plan.model");


module.exports = db;