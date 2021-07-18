'use strict';
module.exports = (sequelize, DataTypes) => {
  var Agenda = sequelize.define('Agenda', {
    days: DataTypes.STRING,
    hours_begin: DataTypes.STRING,
    hours_end: DataTypes.STRING,
    is_disponible: DataTypes.BOOLEAN,
    last_date_maj: DataTypes.STRING,
    agentId: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Agenda.belongsTo(models.Agent,{
          foreignKey:{
            allowNull:false
          }
        })
      }
    }
  });
  return Agenda;
};