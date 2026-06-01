"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("categories", {
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

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("categories");
  },
};