'use strict';
module.exports = (sequelize, DataTypes) => {
  var Courier = sequelize.define('Courier', {
    motif: DataTypes.STRING,
    hours: DataTypes.STRING, //je dois l'enlever
    date: DataTypes.STRING, //je dois l'enlever
    years_again: DataTypes.STRING, //je dois l'enlever
    observation: DataTypes.STRING,
    is_ready: DataTypes.BOOLEAN,
    senderAgentId: DataTypes.INTEGER,
    sender_courier: DataTypes.STRING, //je dois l'enlever || je dois savoir son sens
    receiver_courier: DataTypes.STRING //je dois l'enlever || je dois savoir son sens

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Courier.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
      }
    }
  });
  return Courier;
};