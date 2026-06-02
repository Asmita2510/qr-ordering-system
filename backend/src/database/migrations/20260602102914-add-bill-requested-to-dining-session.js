"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "dining_sessions",
      "billRequested",
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "dining_sessions",
      "billRequested"
    );
  },
};