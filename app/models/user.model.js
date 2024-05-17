const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }],
    planner: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan"
    }]

  })
);

module.exports = User;