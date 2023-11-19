'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [{
      name: "Superadmin",
      email: "superadmin@gmail.com",
      encryptedPassword: bcrypt.hashSync("superadmin123", 10),
      phoneNumber: "08123456789",
      address: "Indonesia",
      role: "SUPERADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
