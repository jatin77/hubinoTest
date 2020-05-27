require("dotenv").config();
const Sequelize = require("sequelize");

const DB_NAME = process.env.DB_NAME || "node-complete";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
