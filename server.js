const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");

const app = express();





// app.use(cors({
//   credentials: true,
//   origin: ["*"]
// }));
/* for Angular Client (withCredentials) */
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
const recetasRoutes = require('./app/routes/recipe.routes');

const Role = db.role;

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});


app.use("/",recetasRoutes);

;


// Puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Script Inicial para inicializar los roles en la BD si no existen

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }
