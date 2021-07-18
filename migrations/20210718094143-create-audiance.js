'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Audiances', {
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
      autorisation: {
        type: Sequelize.STRING
      },
      is_working: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      is_signal: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      receiverAgentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Agents',
          key:'id'
        }
      },
      senderAgentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Agents',
          key:'id'
        }
      },
      correspondantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Correspondants',
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
    await queryInterface.dropTable('Audiances');
  }
};