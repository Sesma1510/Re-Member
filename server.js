const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const todoRoutes = require("./routes/todos");
const hbs = require("hbs");
const capitalize = require("./utils/capitalize");
const projectName = "Re-Member";

require("dotenv").config({ path: "./config/.env" });

require("./config/passport")(passport);

connectDB();

app.locals.appTitle = `${capitalize(projectName)}`;

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/todos", todoRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Encendio!`);
});
