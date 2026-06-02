"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "orders",
      "orderNumber",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "orders",
      "orderNumber"
    );
  },
};