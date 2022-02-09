const Sequelize = require("sequelize");

const db = new Sequelize("uptask", "root", "", {
  host: "127.0.0.2",
  dialect: "mysql",
  define: {
      timestamps: false,
  },
});

module.exports = db;

