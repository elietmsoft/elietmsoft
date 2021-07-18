'use strict';
module.exports = (sequelize, DataTypes) => {
  var Correspondant = sequelize.define('Correspondant', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    profession: DataTypes.STRING,
    date_enreg: DataTypes.STRING,
    agentId: DataTypes.INTEGER,
    url_filter: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Correspondant.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Correspondant.hasMany(models.PieceJointe)
        models.Correspondant.hasMany(models.Audiance)
      }
    }
  });
  return Correspondant;
};