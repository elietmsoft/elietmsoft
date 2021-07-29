'use strict';
module.exports = (sequelize, DataTypes) => {
  var Audiance = sequelize.define('Audiance', {
    motif: DataTypes.STRING,
    hours: DataTypes.STRING, //je dois l'enlever
    date: DataTypes.STRING, //je dois l'enlever
    years_again: DataTypes.STRING, //je dois l'enlever
    observation: DataTypes.STRING,
    autorisation: DataTypes.STRING, //integer niveau de traitement à chaque post(post1=1,post2=2,post3=3,post4=4)
    is_working: DataTypes.BOOLEAN,
    is_signal: DataTypes.BOOLEAN,  //signaler si c'est l'urgence (0,1) or (false,true)
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