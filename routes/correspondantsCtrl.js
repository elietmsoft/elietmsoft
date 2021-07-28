var bcrypt    = require('bcrypt');
var models    = require('../models');
var asyncLib  = require('async');
var jwtUtils  = require('../utils/jwt.utils');

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
const EMAIL_DEFAULT = "corresp.protokole@gmail.com";
const CONTACT_DEFAULT = "+24300000000";
const ADDRESS_DEFAULT = "";
const DATE_DEFAULT = new Date();

// Routes
module.exports = {
    add:(req,res)=>{
      //Params
      var name          = req.body.name;
      var lastname      = req.body.lastname;
      var firstname     = req.body.firstname;
      var gender        = req.body.gender;
      var contact       = req.body.contact;
      var email         = req.body.email;
      var address       = req.body.address;
      var profession    = req.body.profession;
      //var date_enreg    = req.body.date_enreg;
      //var url_filter    = req.body.url_filter;
      var agentId       = req.body.agentId;

      if(name ===null){return res.status(400).json({'error':'le nom est obligatoire'})}
      if(lastname ===null){return res.status(400).json({'error':'le postnom est obligatoire'})}
      if(firstname ===null){return res.status(400).json({'error':'le prénom est obligatoire'})}
      if(gender ===null){return res.status(400).json({'error':'le sexe est obligatoire'})}
     
      if(agentId ===null){return res.status(400).json({'error':'l agent est obligatoire'})}
      if(email ===null || email===undefined){email = EMAIL_DEFAULT}
      if(contact ===null){contact = CONTACT_DEFAULT}
      if(address ===null){address = ADDRESS_DEFAULT}
      //if(date_enreg ===null){date_enreg = DATE_DEFAULT}
      if (!EMAIL_REGEX.test(email)) {return res.status(400).json({ 'error': 'email non valide' });}
      
      asyncLib.waterfall([(done)=>{
        models.Correspondant.findOne({
          attributes: ['name','lastname','firstname','gender'],
          where: {
             name: name, 
             lastname:lastname,
             firstname:firstname,
             gender:gender
          }
        })
        .then((correspondant)=>{
          if(correspondant){return res.status(400).json({'error':'ce correspondant existe déjà'})}
          else{
              models.Correspondant.create({
                name : name,
                lastname:lastname,
                firstname:firstname,
                gender:gender,
                contact:contact,
                email:email,
                address:address,
                profession:profession?profession:'',
                agentId:agentId
              }).then((newCorresp)=>{
                if(newCorresp){return res.status(200).json({'success':newCorresp})}
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
      var id            = req.body.id;
      var name          = req.body.name;
      var lastname      = req.body.lastname;
      var firstname     = req.body.firstname;
      var gender        = req.body.gender;
      var contact       = req.body.contact;
      var email         = req.body.email;
      var address       = req.body.address;
      var profession    = req.body.profession;
      //var date_enreg    = req.body.date_enreg;
      //var url_filter    = req.body.url_filter;
      var agentId       = req.body.agentId;

      if(id === null){return res.status(400).json({'error':'identifiant non valide'})}
       asyncLib.waterfall([(done)=>{
         models.Correspondant.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((correspondant)=>{
           if(!correspondant){return res.status(400).json({'error':'ce correspondant n existe pas'})}
           else{
            correspondant.update({
              name: (name ? name : correspondant.name),
              lastname: (lastname ? lastname : correspondant.lastname),
              firstname: (firstname ? firstname : correspondant.firstname),
              gender: (gender ? gender : correspondant.gender),
              contact: (contact ? contact : correspondant.contact),
              email: (email ? email : correspondant.email),
              address: (address ? address : correspondant.address),
              profession: (profession ? profession : correspondant.profil),
              agentId: (agentId ? agentId : correspondant.agentId),
            }).then((agent)=>{
              if(!agent){return res.status(400).json({'error':'mise à jour a échoué'})}
              else{return res.status(200).json({'success':correspondant})}
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

      if(id === null){return res.status(400).json({'error':'veuillez choisir le correspondant'})}
       asyncLib.waterfall([(done)=>{
         models.Correspondant.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((correspondant)=>{
           if(!correspondant){return res.status(400).json({'error':'ce correspondant n existe pas'})}
           else{
              correspondant.destroy();
              return res.status(200).json({'success':'correspondant supprimé'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listCorrespondants:(req,res)=>{
        models.Correspondant.findAll({
          order:[['name','ASC'],['lastname','ASC'],['firstname','ASC']],
          include: [{model: models.Agent}]
        }).
        then((correspondants)=>{if (correspondants) {res.status(200).json(correspondants)} 
          else {res.status(404).json({ "error": "correspondant(s) non trouvé(s)" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listCorrespondantsById:(req,res)=>{
      id = req.params.id
      models.Correspondant.findAll({
          where: { id: id },
          include: [{model: models.Agent}]
      }).
      then((correspondants)=>{if (correspondants) {res.status(200).json(correspondants)} 
        else {res.status(404).json({ "error": "correspondant non trouvé" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

  }
}
