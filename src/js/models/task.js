const Sequelize = require("sequelize");
const database = require("../db");

const usuario = database.define(
   "tb_tarefas",
   {
      id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true,
      },
      titulo: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      descricao: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      data_criacao: {
         type: Sequelize.DATE,
         allowNull: false,
      },
   },
   {
      timestamps: false,
   }
);

module.exports = usuario;
