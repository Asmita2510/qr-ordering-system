"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
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

      tableId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tables",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      sessionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "dining_sessions",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM(
          "PLACED",
          "PREPARING",
          "READY",
          "SERVED",
          "CANCELLED"
        ),
        defaultValue: "PLACED",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP"
        ),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("orders");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_status";'
    );
  },
};