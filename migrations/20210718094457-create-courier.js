'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Couriers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      motif: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hours: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      years_again: {
        allowNull: false,
        type: Sequelize.STRING
      },
      observation: {
        type: Sequelize.STRING
      },
      is_ready: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      senderAgentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Agents',
          key:'id'
        }
      },
      sender_courier: {
        type: Sequelize.STRING
      },
      receiver_courier: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Couriers');
  }
};