var models    = require('../models');
var asyncLib  = require('async');

// Routes
module.exports = {
    add:(req,res)=>{
      //Params
      var intitule = req.body.intitule;

      if(intitule === null){return res.status(400).json({'error':'le nom est obligatoire'})}
      asyncLib.waterfall([(done)=>{
        models.Service.findOne({
          attributes: ['intitule'],
          where: { intitule: intitule }
        })
        .then((serviceFound)=>{
          if(serviceFound){return res.status(400).json({'error':'le service existe déjà'})}
          else{
            var newService = models.Service.create({
              intitule : intitule
            }).then((newService)=>{
              if(newService){return res.status(200).json({'success':newService})}
            }).catch((error)=>{if(error){return res.status(400).json({'error':'enregistrement a échoué'})}})
          }
        })
        .catch((error)=>{
          if(error){return res.status(400).json({'error':'vérifier les attributs'})}
        })
      }])
    }
}
