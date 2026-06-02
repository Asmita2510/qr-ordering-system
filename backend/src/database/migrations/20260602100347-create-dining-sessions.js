"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "dining_sessions",
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

        status: {
          type: Sequelize.ENUM(
            "ACTIVE",
            "COMPLETED"
          ),
          defaultValue: "ACTIVE",
        },

        startedAt: {
          type: Sequelize.DATE,
          defaultValue:
            Sequelize.literal(
              "CURRENT_TIMESTAMP"
            ),
        },

        completedAt: {
          type: Sequelize.DATE,
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
      "dining_sessions"
    );

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_dining_sessions_status";'
    );
  },
};