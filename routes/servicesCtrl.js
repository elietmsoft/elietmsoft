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
        .catch((error)=>{if(error){return res.status(400).json({'error':'connexion a échoué'})}})
      }])
    },

    update:(req,res)=>{
      //Params
      var intitule = req.body.intitule;
      var id    = req.body.id;

      if(intitule === null){return res.status(400).json({'error':'veuillez mettre le nom'})}
       asyncLib.waterfall([(done)=>{
         models.Service.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((serviceFound)=>{
           if(!serviceFound){return res.status(400).json({'error':'ce service n existe pas'})}
           else{
            serviceFound.update({
               intitule: (intitule ? intitule : serviceFound.intitule)
             }).then((serviceUpdating)=>{
               if(!serviceUpdating){return res.status(400).json({'error':'mise à jour a échoué'})}
               else{return res.status(200).json({'success':serviceUpdating})}
             })
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    delete:(req,res)=>{
      //Params
      var id    = req.params.id;

      if(id === null){return res.status(400).json({'error':'veuillez choisir le service'})}
       asyncLib.waterfall([(done)=>{
         models.Service.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((serviceFound)=>{
           if(!serviceFound){return res.status(400).json({'error':'ce service n existe pas'})}
           else{
              serviceFound.destroy();
              return res.status(200).json({'success':'service supprimé'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listServices:(req,res)=>{
        models.Service.findAll({
          order:[['intitule','ASC']]
        }).
        then((services)=>{if (services) {res.status(200).json(services)} 
          else {res.status(404).json({ "error": "services non trouvés" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listServicesById:(req,res)=>{
      id = req.params.id
      models.Service.findAll({
          where: { id: id }
      }).
      then((services)=>{if (services) {res.status(200).json(services)} 
        else {res.status(404).json({ "error": "service non trouvé" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

  }
}
