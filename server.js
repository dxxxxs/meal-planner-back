const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

const app = express();


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

// JSON Parser
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "MealPlanner",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require('./app/routes/recipe.routes')(app);

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
