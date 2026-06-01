"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subscriptions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        onUpdate: "CASCADE",
      },

      planName: {
        type: Sequelize.ENUM(
          "FREE",
          "PRO",
          "ENTERPRISE"
        ),
        allowNull: false,
        defaultValue: "FREE",
      },

      status: {
        type: Sequelize.ENUM(
          "TRIAL",
          "ACTIVE",
          "EXPIRED",
          "CANCELLED"
        ),
        allowNull: false,
        defaultValue: "TRIAL",
      },

      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("subscriptions");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_subscriptions_planName";'
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_subscriptions_status";'
    );
  },
};