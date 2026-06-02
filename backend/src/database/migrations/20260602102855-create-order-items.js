"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "order_items",
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

        orderId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "orders",
            key: "id",
          },
          onDelete: "CASCADE",
        },

        menuItemId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "menu_items",
            key: "id",
          },
        },

        variantId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model:
              "menu_item_variants",
            key: "id",
          },
        },

        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        unitPrice: {
          type: Sequelize.DECIMAL(
            10,
            2
          ),
          allowNull: false,
        },

        totalPrice: {
          type: Sequelize.DECIMAL(
            10,
            2
          ),
          allowNull: false,
        },

        specialInstructions: {
          type: Sequelize.TEXT,
          allowNull: true,
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue:
            Sequelize.literal(
              "CURRENT_TIMESTAMP"
            ),
        },

        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
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
      "order_items"
    );
  },
};