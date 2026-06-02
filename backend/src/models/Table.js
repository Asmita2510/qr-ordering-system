const { DataTypes } = require(
  "sequelize"
);

const sequelize = require(
  "../config/db"
);

const Table = sequelize.define(
  "Table",
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

    tableNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 4,
    },

    status: {
      type: DataTypes.ENUM(
        "AVAILABLE",
        "OCCUPIED",
        "RESERVED"
      ),
      defaultValue:
        "AVAILABLE",
    },

    qrCode: {
      type: DataTypes.STRING,
    },
    qrToken: {
  type: DataTypes.STRING,
  unique: true,
},
  },
  {
    tableName: "tables",
  }
);

module.exports = Table;