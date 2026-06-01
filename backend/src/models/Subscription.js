const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Subscription = sequelize.define(
  "Subscription",
  {
   id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
},

    planName: {
      type: DataTypes.ENUM(
        "FREE",
        "BASIC",
        "PRO",
        "ENTERPRISE"
      ),
      defaultValue: "FREE",
    },

    status: {
      type: DataTypes.ENUM(
        "TRIAL",
        "ACTIVE",
        "EXPIRED",
        "CANCELLED"
      ),
      defaultValue: "TRIAL",
    },

    startDate: DataTypes.DATE,

    endDate: DataTypes.DATE,
  },
  {
    tableName: "subscriptions",
  }
);

module.exports = Subscription;