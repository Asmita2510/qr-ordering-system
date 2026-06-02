const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    menuItemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    variantId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    specialInstructions: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "order_items",
  }
);

module.exports = OrderItem;