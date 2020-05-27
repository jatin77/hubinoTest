require("dotenv").config();
const express = require("express");

// const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const sequelize = require("./util/database");
const cors = require("cors");
const app = express();

// CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use(adminRoutes);

// Start server on database connection success
sequelize
  .sync()
  .then((res) => {
    app.listen(process.env.SERVER_PORT || 3100);
  })
  .catch((err) => {
    console.log(err);
  });
