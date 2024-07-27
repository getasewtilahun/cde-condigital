"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        full_name: "Admin",
        email: "admin@condigital.com",
        position: "Admin",
        is_super_user: true,
        password:
          "$2b$10$.QN.9JOtf8Eg8EhaCTs5ouFFVumFWMIbV0yCkCkzgutuLsw3Q6hAu",
        createdAt: "2023/11/04",
        updatedAt: "2023/11/04",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("services", null, {});
  },
};