"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tables", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal(
          "gen_random_uuid()"
        ),
        primaryKey: true,
        allowNull: false,
      },

      restaurantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "restaurants",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      tableNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
      },

      status: {
        type: Sequelize.ENUM(
          "AVAILABLE",
          "OCCUPIED",
          "RESERVED"
        ),
        defaultValue: "AVAILABLE",
      },

      qrCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP"
        ),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      "tables"
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_tables_status";'
    );
  },
};