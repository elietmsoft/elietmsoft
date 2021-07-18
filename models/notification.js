'use strict';
module.exports = (sequelize, DataTypes) => {
  var Notification = sequelize.define('Notification', {
    intitule: DataTypes.STRING,
    date: DataTypes.STRING,
    is_ready: DataTypes.BOOLEAN,
    receiverAgentId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Notification.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
      }
    }
  });
  return Notification;
};