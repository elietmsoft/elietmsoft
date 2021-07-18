'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PieceJointes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type_piece: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_piece: {
        type: Sequelize.STRING
      },
      image_piece: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('PieceJointes');
  }
};