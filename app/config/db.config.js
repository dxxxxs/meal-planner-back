module.exports = {
  HOST: process.env.MONGO_HOST || "localhost",
  PORT: process.env.MONGO_PORT || 27017,
  DB: process.env.MONGO_DB || "meal_planner",
  URL: process.env.MONGO_URL
};
