const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
    },

    phone: {
      type: DataTypes.STRING,
    },

    subscriptionPlan: {
      type: DataTypes.STRING,
      defaultValue: "FREE",
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "restaurants",
  }
);

module.exports = Restaurant;