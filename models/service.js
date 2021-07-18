'use strict';
module.exports = (sequelize, DataTypes) => {
  var Service = sequelize.define('Service', {
    intitule: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Service.hasMany(models.Agent)
      }
    }
  });
  return Service;
};