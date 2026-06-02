const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);

const DiningSession =
  sequelize.define(
    "DiningSession",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue:
          DataTypes.UUIDV4,
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

      status: {
        type: DataTypes.ENUM(
          "ACTIVE",
          "COMPLETED"
        ),
        defaultValue:
          "ACTIVE",
      },

      startedAt: {
        type: DataTypes.DATE,
      },

      completedAt: {
        type: DataTypes.DATE,
      },
      billRequested: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
},
    },

    {
      tableName:
        "dining_sessions",
    }
  );

module.exports =
  DiningSession;