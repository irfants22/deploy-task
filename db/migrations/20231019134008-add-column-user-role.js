'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "role", {
      allowNull: false,
      type: Sequelize.ENUM("SUPERADMIN", "ADMIN", "MEMBER"),
      defaultValue: "MEMBER"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "role");
  }
};
