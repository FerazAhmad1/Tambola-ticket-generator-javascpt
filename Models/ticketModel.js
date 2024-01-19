const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const TicketModel = sequelize.define("tambola", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  ticket: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TicketModel;
