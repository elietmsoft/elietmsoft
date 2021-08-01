var models    = require('../models');
var asyncLib  = require('async');


// Routes
module.exports = {
    add:(req,res)=>{
      //Params
      var titre = req.body.titre;

      if(titre ===null){return res.status(400).json({'error':'le nom est obligatoire'})}
      asyncLib.waterfall([(done)=>{
        models.Fonction.findOne({
          attributes: ['titre'],
          where: { titre: titre }
        })
        .then((fonctionFound)=>{
          if(fonctionFound){return res.status(400).json({'error':'la fonction existe déjà'})}
          else{
            var newFonction = models.Fonction.create({
              titre : titre
            }).then((newFonction)=>{
              if(newFonction){return res.status(200).json({'success':newFonction})}
            }).catch((error)=>{if(error){return res.status(400).json({'error':'enregistrement a échoué'})}})
          }
        })
        .catch((error)=>{
          if(error){return res.status(400).json({'error':'connexion a échoué'})}
        })
      }])
    },

    update:(req,res)=>{

      //Params
      var titre = req.body.titre;
      var id    = req.body.id;

      if(titre === null){return res.status(400).json({'error':'veuillez mettre le titre'})}
       asyncLib.waterfall([(done)=>{
         models.Fonction.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((fonctionFound)=>{
           if(!fonctionFound){return res.status(400).json({'error':'cette fonction n existe pas'})}
           else{
             fonctionFound.update({
               titre: (titre ? titre : fonctionFound.titre)
             }).then((fonctionUpdating)=>{
               if(!fonctionUpdating){return res.status(400).json({'error':'mise à jour a échoué'})}
               else{return res.status(200).json({'success':fonctionUpdating})}
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

      if(id === null){return res.status(400).json({'error':'veuillez choisir la fonction'})}
       asyncLib.waterfall([(done)=>{
         models.Fonction.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((fonctionFound)=>{
           if(!fonctionFound){return res.status(400).json({'error':'cette fonction n existe pas'})}
           else{
              fonctionFound.destroy();
              return res.status(200).json({'success':'fonction supprimée'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listFonctions:(req,res)=>{
        models.Fonction.findAll({
          order:[['titre','ASC']]
        }).
        then((fonctions)=>{if (fonctions) {res.status(200).json(fonctions)} 
          else {res.status(404).json({ "error": "fonctions non trouvées" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listFonctionsById:(req,res)=>{
      id = req.params.id
      models.Fonction.findAll({
          where: { id: id }
      }).
      then((fonctions)=>{if (fonctions) {res.status(200).json(fonctions)} 
        else {res.status(404).json({ "error": "fonction non trouvée" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

  }
}
