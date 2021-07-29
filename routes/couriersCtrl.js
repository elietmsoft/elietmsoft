var bcrypt    = require('bcrypt');
var models    = require('../models');
var asyncLib  = require('async');
var jwtUtils  = require('../utils/jwt.utils');

// Routes
module.exports = {
    add:(req,res)=>{
      //Params
      var motif           = req.body.motif;
      /*
      var hours           = req.body.hours;
      var date            = req.body.date;
      var years_again     = req.body.years_again;*/
      var observation     = req.body.observation;
      var autorisation    = req.body.autorisation;
      var is_working      = req.body.is_working;
      var  is_signal      = req.body.is_signal;
      var receiverAgentId = req.body.receiverAgentId;
      var senderAgentId   = req.body.senderAgentId;
      var correspondantId = req.body.correspondantId;

      if(motif ===null){return res.status(400).json({'error':'le motif de l audiance est obligatoire'})}
      if(observation ===null){return res.status(400).json({'error':'l observation est obligatoire'})}
      if(autorisation ===null){return res.status(400).json({'error':'la autorisation est obligatoire'})}
      if(is_working ===null || is_working===undefined){is_working = 0;}
      if(is_signal ===null || is_signal===undefined){is_signal = 0;}
      if(receiverAgentId ===null){return res.status(400).json({'error':'l agent destinateur est obligatoire'})}
      if(senderAgentId ===null){return res.status(400).json({'error':'l agent est obligatoire'});}
      if(correspondantId ===null){return res.status(400).json({'error':'le correspondant est obligatoire'});}
      
      asyncLib.waterfall([(done)=>{
        models.Audiance.create({
          motif : motif,
          observation:observation,
          autorisation:autorisation,
          is_working:is_working,
          is_signal:is_signal,
          receiverAgentId:receiverAgentId,
          senderAgentId:senderAgentId,
          correspondantId:correspondantId,
        }).then((newAudiance)=>{
          if(newAudiance){return res.status(200).json({'success':newAudiance})}
        }).catch((error)=>{
          if(error){return res.status(400).json({'error':'enregistrement a échoué!'})}})
      }])
    },

    update:(req,res)=>{
      //Params
      var id              = req.body.id;
      var motif           = req.body.motif;
      var observation     = req.body.observation;
      var autorisation    = req.body.autorisation;
      var is_working      = req.body.is_working;
      var  is_signal      = req.body.is_signal;
      var receiverAgentId = req.body.receiverAgentId;
      var senderAgentId   = req.body.senderAgentId;
      var correspondantId = req.body.correspondantId;

      if(id === null){return res.status(400).json({'error':'identifiant non valide'})}
       asyncLib.waterfall([(done)=>{
         models.Audiance.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((audiance)=>{
           if(!audiance){return res.status(400).json({'error':'cette audiance n existe pas'})}
           else{
            audiance.update({
              motif: (motif ? motif : audiance.motif),
              observation: (observation ? observation : audiance.observation),
              autorisation: (autorisation ? autorisation : audiance.autorisation),
              is_working: (is_working ? is_working : audiance.is_working),
              is_signal: (is_signal ? is_signal : audiance.is_signal),
              receiverAgentId: (receiverAgentId ? receiverAgentId : audiance.receiverAgentId),
              senderAgentId: (senderAgentId ? senderAgentId : audiance.senderAgentId),
              correspondantId: (correspondantId ? correspondantId : audiance.correspondantId),
            }).then((audiance)=>{
              if(!audiance){return res.status(400).json({'error':'mise à jour a échoué'})}
              else{return res.status(200).json({'success': audiance})}
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

      if(id === null){return res.status(400).json({'error':'veuillez choisir la pièce'})}
       asyncLib.waterfall([(done)=>{
         models.Audiance.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((audiance)=>{
           if(!audiance){return res.status(400).json({'error':'cette audiance n existe pas'})}
           else{
              audiance.destroy();
              return res.status(200).json({'success':'audiance supprimée'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listAudiances:(req,res)=>{
        models.Audiance.findAll({
          order:[['updatedAt','ASC']],
          include: [{model: models.Agent},{model: models.Correspondant}]
        }).
        then((audiances)=>{if (audiances) {res.status(200).json(audiances)} 
          else {res.status(404).json({ "error": "audiance(s) non trouvée(s)" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listAudiancesById:(req,res)=>{
      id = req.params.id
      models.Audiance.findAll({
          where: { id: id },
          include: [{model: models.Agent},{model: models.Correspondant}]
      }).
      then((audiances)=>{if (pieces) {res.status(200).json(audiances)} 
        else {res.status(404).json({ "error": "audiance non trouvée" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})
    },

    listAudiancesByIsWorking:(req,res)=>{
      is_working = req.params.is_working
      models.Audiance.findAll({
          order:[['updatedAt','ASC']],
          where: { is_working: is_working },
          include: [{model: models.Agent},{model: models.Correspondant}]
      }).
      then((audiances)=>{if (pieces) {res.status(200).json(audiances)} 
        else {res.status(404).json({ "error": "audiance non trouvée" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})
    },

    listAudiancesByIsSignal:(req,res)=>{
      is_signal = req.params.is_signal
      models.Audiance.findAll({
          order:[['updatedAt','ASC']],
          where: { is_signal: is_signal },
          include: [{model: models.Agent},{model: models.Correspondant}]
      }).
      then((audiances)=>{if (pieces) {res.status(200).json(audiances)} 
        else {res.status(404).json({ "error": "audiance non trouvée" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})
    }
}
