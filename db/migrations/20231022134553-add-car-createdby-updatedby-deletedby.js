"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Cars", "createdBy", {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: "11f0c633-289b-4f31-9f69-2c53b8632705",
      references: {
        model: "Users",
        key: "id",
      },
    });

    await queryInterface.addColumn("Cars", "updatedBy", {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    });

    await queryInterface.addColumn("Cars", "deletedBy", {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Cars", "createdBy");
    await queryInterface.removeColumn("Cars", "updatedBy");
    await queryInterface.removeColumn("Cars", "deletedBy");
  },
};
