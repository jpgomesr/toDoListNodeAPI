const Sequelize = require("sequelize");

const compSequelize = new Sequelize("db_todolist", "root", "", {
   dialect: "mysql",
   host: "localhost",
});

module.exports = compSequelize;
