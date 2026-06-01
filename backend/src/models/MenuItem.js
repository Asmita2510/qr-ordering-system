const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MenuItem = sequelize.define(
  "MenuItem",
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

    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: DataTypes.TEXT,

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    foodType: {
      type: DataTypes.ENUM(
        "VEG",
        "NON_VEG",
        "VEGAN"
      ),
      allowNull: false,
    },

    image: DataTypes.STRING,

    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "menu_items",
  }
);

module.exports = MenuItem;