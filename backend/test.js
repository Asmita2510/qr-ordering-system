require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log("USER:", JSON.stringify(process.env.DB_USER));
console.log("PASSWORD:", JSON.stringify(process.env.DB_PASSWORD));
console.log("DB:", JSON.stringify(process.env.DB_NAME));

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected!");
  } catch (err) {
    console.error(err);
  }
})();

