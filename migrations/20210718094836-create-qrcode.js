'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Qrcodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qr_image: {
        type: Sequelize.STRING
      },
      qr_number: {
        type: Sequelize.STRING
      },
      hours: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      audianceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Audiances',
          key:'id'
        }
      },
      agentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Agents',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Qrcodes');
  }
};