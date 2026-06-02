"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "menu_items",
      "price",
      {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "menu_items",
      "price"
    );
  },
};