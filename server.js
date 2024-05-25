require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const serverConfig = require("./app/config/server.config");

const app = express();


app.use(
  cors({
    credentials: true,
    origin: serverConfig.getCorsOrigins(),
  })
);

// JSON Parser
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "MealPlanner",
    keys: [serverConfig.COOKIE_SECRET], // should use as secret environment variable
    httpOnly: true
  })
);


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require('./app/routes/recipe.routes')(app);
require('./app/routes/plan.routes')(app);
require('./app/routes/healthcheck.routes')(app);

db.mongoose
  .connect(dbConfig.URL, {
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
app.listen(serverConfig.API_PORT, () => {
  console.log(`Server is running on port ${serverConfig.API_PORT}.`);
});
