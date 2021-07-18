'use strict';
module.exports = (sequelize, DataTypes) => {
  var Courier = sequelize.define('Courier', {
    motif: DataTypes.STRING,
    hours: DataTypes.STRING,
    date: DataTypes.STRING,
    years_again: DataTypes.STRING,
    observation: DataTypes.STRING,
    is_ready: DataTypes.BOOLEAN,
    senderAgentId: DataTypes.INTEGER,
    sender_courier: DataTypes.STRING,
    receiver_courier: DataTypes.STRING

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