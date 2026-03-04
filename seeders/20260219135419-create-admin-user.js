'use strict';
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const hashedPassword = await bcrypt.hash("Admin123", 10);

    await queryInterface.bulkInsert('users', [{
      name: 'System Admin',
      email: 'admin@system.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@system.com'
    });
  }
};
