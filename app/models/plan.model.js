const mongoose = require("mongoose");

const Plan = mongoose.model(
    "Plan",
    new mongoose.Schema({
        date: {
            type: Date,
            required: true
        },
        breakfast: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        snack: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        lunch: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        teatime: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        dinner: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }]
    })
);

module.exports = Plan;