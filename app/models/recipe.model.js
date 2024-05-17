const mongoose = require("mongoose");

const Recipe = mongoose.model(
    "Recipe",
    new mongoose.Schema(
    )
);

module.exports = Recipe;

