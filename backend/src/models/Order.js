const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
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

    tableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PLACED",
        "PREPARING",
        "READY",
        "SERVED",
        "CANCELLED"
      ),
      defaultValue: "PLACED",
    },
    orderNumber: {
  type: DataTypes.INTEGER,
},
  },
  {
    tableName: "orders",
  }
);

module.exports = Order;