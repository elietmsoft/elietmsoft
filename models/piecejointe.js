'use strict';
module.exports = (sequelize, DataTypes) => {
  var PieceJointe = sequelize.define('PieceJointe', {
    type_piece: DataTypes.STRING,
    numero_piece: DataTypes.STRING,
    image_piece: DataTypes.STRING,
    correspondantId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.PieceJointe.belongsTo(models.Correspondant,{
          foreignKey:{
            allowNull:false
          }
        })
      }
    }
  });
  return PieceJointe;
};