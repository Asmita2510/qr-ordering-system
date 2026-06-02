"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "menu_item_variants",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue:
            Sequelize.literal(
              "gen_random_uuid()"
            ),
          primaryKey: true,
          allowNull: false,
        },

        menuItemId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "menu_items",
            key: "id",
          },
          onDelete: "CASCADE",
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        price: {
          type: Sequelize.DECIMAL(
            10,
            2
          ),
          allowNull: false,
        },

        isAvailable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue:
            Sequelize.literal(
              "CURRENT_TIMESTAMP"
            ),
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue:
            Sequelize.literal(
              "CURRENT_TIMESTAMP"
            ),
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      "menu_item_variants"
    );
  },
};