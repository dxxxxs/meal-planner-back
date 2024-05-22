const mongoose = require("mongoose");

const Plan = mongoose.model(
    "Plan",
    new mongoose.Schema({
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: String,
            required: true
        },
        breakfast: [{
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            quantity: {
                type: Number,
                default: 100
            }
        }],
        snack: [{
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            quantity: {
                type: Number,
                default: 100
            }
        }],
        lunch: [{
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            quantity: {
                type: Number,
                default: 100
            }
        }],
        teatime: [{
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            quantity: {
                type: Number,
                default: 100
            }
        }],
        dinner: [{
            recipe: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe'
            },
            quantity: {
                type: Number,
                default: 100
            }
        }]
    })
);

module.exports = Plan;