const app = require("./src/app.js");
const connectDB = require("./src/db/db.js");
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, (req, res) => {
      console.log("Server is running on port :", PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection error: ", error.message);
  });
