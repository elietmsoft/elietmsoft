'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agent = sequelize.define('Agent', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profil: DataTypes.STRING,
    serviceId: DataTypes.INTEGER,
    fonctionId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Agent.belongsTo(models.Fonction,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Agent.belongsTo(models.Service,{
          foreignKey:{
            allowNull:false
          }
        })
  
        models.Agent.hasMany(models.Correspondant)
        models.Agent.hasMany(models.Agenda)
        models.Agent.hasMany(models.Notification)
        models.Agent.hasMany(models.Audiance)
        models.Agent.hasMany(models.Courier)
        models.Agent.hasMany(models.Qrcode)
      }
    }
  });
  return Agent;
};