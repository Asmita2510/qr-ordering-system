"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn(
      "menu_items",
      "price"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "menu_items",
      "price",
      {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      }
    );
  },
};