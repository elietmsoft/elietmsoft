'use strict';
module.exports = (sequelize, DataTypes) => {
  var Audiance = sequelize.define('Audiance', {
    motif: DataTypes.STRING,
    hours: DataTypes.STRING,
    date: DataTypes.STRING,
    years_again: DataTypes.STRING,
    observation: DataTypes.STRING,
    autorisation: DataTypes.STRING,
    is_working: DataTypes.BOOLEAN,
    is_signal: DataTypes.BOOLEAN,
    receiverAgentId: DataTypes.INTEGER,
    senderAgentId: DataTypes.INTEGER,
    correspondantId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Audiance.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Audiance.belongsTo(models.Correspondant,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Audiance.hasMany(models.Qrcode)
      }
    }
  });
  return Audiance;
};