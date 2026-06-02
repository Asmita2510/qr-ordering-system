const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MenuItemVariant =
  sequelize.define(
    "MenuItemVariant",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:
          DataTypes.UUIDV4,
        primaryKey: true,
      },

      menuItemId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(
          10,
          2
        ),
        allowNull: false,
      },

      isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName:
        "menu_item_variants",
    }
  );

module.exports =
  MenuItemVariant;