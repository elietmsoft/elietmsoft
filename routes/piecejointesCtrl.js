var bcrypt    = require('bcrypt');
var models    = require('../models');
var asyncLib  = require('async');
var jwtUtils  = require('../utils/jwt.utils');

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
    add:(req,res)=>{
      //Params
      var type_piece         = req.body.type_piece;
      var numero_piece       = req.body.numero_piece;
      var image_piece        = req.body.image_piece;
      var correspondantId    = req.body.correspondantId;

      if(type_piece ===null){return res.status(400).json({'error':'le type de pièce est obligatoire'})}
      if(numero_piece ===null){return res.status(400).json({'error':'le numéro de la pièce est obligatoire'})}
      if(image_piece ===null){return res.status(400).json({'error':'la photo de la carte est obligatoire'})}
      if(correspondantId ===null){return res.status(400).json({'error':'le correspondant est obligatoire'})}
      
      asyncLib.waterfall([(done)=>{
        models.PieceJointe.findOne({
          attributes: ['correspondantId'],
          where: {
             correspondantId:correspondantId
          }
        })
        .then((piece)=>{
          if(piece){return res.status(400).json({'error':'cette pièce existe déjà'})}
          else{
              models.PieceJointe.create({
                type_piece : type_piece,
                numero_piece:numero_piece,
                image_piece:image_piece,
                correspondantId:correspondantId
              }).then((newPiece)=>{
                if(newPiece){return res.status(200).json({'success':newPiece})}
              }).catch((error)=>{
                if(error){return res.status(400).json({'error':'enregistrement a échoué!'})}})
          }
        })
        .catch((error)=>{
          if(error){return res.status(400).json({'error':'connexion a échoué'})}
        })
      }])
    },

    update:(req,res)=>{
      //Params
      var id                 = req.body.id;
      var type_piece         = req.body.type_piece;
      var numero_piece       = req.body.numero_piece;
      var image_piece        = req.body.image_piece;
      var correspondantId    = req.body.correspondantId;

      if(id === null){return res.status(400).json({'error':'identifiant non valide'})}
       asyncLib.waterfall([(done)=>{
         models.PieceJointe.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((piece)=>{
           if(!piece){return res.status(400).json({'error':'cette pièce n existe pas'})}
           else{
            piece.update({
              type_piece: (type_piece ? type_piece : piece.type_piece),
              numero_piece: (numero_piece ? numero_piece : piece.numero_piece),
              image_piece: (image_piece ? image_piece : piece.image_piece),
              correspondantId: (correspondantId ? correspondantId : piece.correspondantId),
            }).then((piece)=>{
              if(!piece){return res.status(400).json({'error':'mise à jour a échoué'})}
              else{return res.status(200).json({'success': piece})}
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
         models.PieceJointe.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((piece)=>{
           if(!piece){return res.status(400).json({'error':'cette pièce n existe pas'})}
           else{
              piece.destroy();
              return res.status(200).json({'success':'pièce supprimée'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listPieceJointes:(req,res)=>{
        models.PieceJointe.findAll({
          order:[['type_piece','ASC'],['numero_piece','ASC']],
          include: [{model: models.Correspondant}]
        }).
        then((pieces)=>{if (pieces) {res.status(200).json(pieces)} 
          else {res.status(404).json({ "error": "pièce(s) non trouvée(s)" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listPieceJointesById:(req,res)=>{
      id = req.params.id
      models.PieceJointe.findAll({
          where: { id: id },
          include: [{model: models.Correspondant}]
      }).
      then((pieces)=>{if (pieces) {res.status(200).json(pieces)} 
        else {res.status(404).json({ "error": "correspondant non trouvé" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

  }
}
