'use strict';
module.exports = (sequelize, DataTypes) => {
  var Qrcode = sequelize.define('Qrcode', {
    qr_image: DataTypes.STRING,
    qr_number: DataTypes.STRING,
    hours: DataTypes.STRING,
    date: DataTypes.STRING,
    audianceId: DataTypes.INTEGER,
    agentId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Qrcode.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Qrcode.belongsTo(models.Audiance,{
          foreignKey:{
            allowNull:false
          }
        })
      }
    }
  });
  return Qrcode;
};