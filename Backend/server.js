const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
const PORT = process.env.PORT || 3000;
const passport = require("./src/utils/passport.js");
const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
connectDB()
  .then((result) => {
    app.listen(PORT, (req, res) => {
      console.log("Server is running on port :", PORT);
    });
  })
  .catch((error) => {
    console.log("Reminder!! MongoDB Connection error!!: ", error.message);
  });
