'use strict';
module.exports = (sequelize, DataTypes) => {
  var Fonction = sequelize.define('Fonction', {
    titre: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Fonction.hasMany(models.Agent)
      }
    }
  });
  return Fonction;
};