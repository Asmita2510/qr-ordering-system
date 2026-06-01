"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("restaurants", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address: Sequelize.TEXT,

      phone: Sequelize.STRING,

      subscriptionPlan: {
        type: Sequelize.STRING,
        defaultValue: "FREE",
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "ACTIVE",
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("restaurants");
  },
};