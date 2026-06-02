"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "tables",
      "qrToken",
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "tables",
      "qrToken"
    );
  },
};