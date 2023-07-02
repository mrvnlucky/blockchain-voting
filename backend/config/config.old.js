require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  db: {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASS: process.env.DB_PASS || "K1ngd0m123!@#",
    DB_NAME: process.env.DB_NAME || "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
