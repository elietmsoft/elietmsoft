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
          if(error){return res.status(400).json({'error':'vérifier les attributs'})}
        })
      }])
    }
}
