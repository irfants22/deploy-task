"use strict";

/** @type {import('sequelize-cli').Migration} */
const crypto = require("crypto");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cars", [
      {
        id: crypto.randomUUID(),
        name: "Car1",
        image: "./images/car00.min.jpg",
        type: "small",
        rentPerDay: 100000,
        capacity: 1,
        description:
          "description about a car.",
        availableAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cars", null, {});
  },
};
