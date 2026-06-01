const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "categories",
  }
);

module.exports = Category;