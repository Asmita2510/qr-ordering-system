"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu_items", {
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

      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      foodType: {
        type: Sequelize.ENUM(
          "VEG",
          "NON_VEG",
          "VEGAN"
        ),
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING,
      },

      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("menu_items");
  },
};