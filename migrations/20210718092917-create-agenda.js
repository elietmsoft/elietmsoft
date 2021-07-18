'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agendas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      days: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hours_begin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hours_end: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_disponible: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      last_date_maj: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agendas');
  }
};