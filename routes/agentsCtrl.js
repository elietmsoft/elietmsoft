var bcrypt    = require('bcrypt');
var models    = require('../models');
var asyncLib  = require('async');
var jwtUtils  = require('../utils/jwt.utils');

// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;
const EMAIL_DEFAULT = "agent.protokole@gmail.com";
const CONTACT_DEFAULT = "+24300000000";
const ADDRESS_DEFAULT = "";
const PROFIL_DEFAULT = "avatar.png";

// Routes
module.exports = {
    register:(req,res)=>{
      //Params
      var name          = req.body.name;
      var lastname      = req.body.lastname;
      var firstname     = req.body.firstname;
      var gender        = req.body.gender;
      var contact       = req.body.contact;
      var email         = req.body.email;
      var address       = req.body.address;
      var username      = req.body.username;
      var password      = req.body.password;
      var profil        = req.body.profil;
      var serviceId     = req.body.serviceId;
      var fonctionId    = req.body.fonctionId;

      if(name ===null){return res.status(400).json({'error':'le nom est obligatoire'})}
      if(lastname ===null){return res.status(400).json({'error':'le postnom est obligatoire'})}
      if(firstname ===null){return res.status(400).json({'error':'le prénom est obligatoire'})}
      if(gender ===null){return res.status(400).json({'error':'le sexe est obligatoire'})}
      if(username ===null){return res.status(400).json({'error':'le nom utilisateur est obligatoire'})}
      if(password ===null){return res.status(400).json({'error':'le mot se password est obligatoire'})}
      if(serviceId ===null){return res.status(400).json({'error':'le service est obligatoire'})}
      if(fonctionId ===null){return res.status(400).json({'error':'la fonction est obligatoire'})}
      if(email ===null){email = EMAIL_DEFAULT}
      if(contact ===null){contact = CONTACT_DEFAULT}
      if(address ===null){address = ADDRESS_DEFAULT}
      if(profil ===null){profil = PROFIL_DEFAULT}
      if (!EMAIL_REGEX.test(email)) {return res.status(400).json({ 'error': 'email non valide' });}
      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'mot de passe invalide\n(mettre la taille 4 - 8 et  inclure au moins 1 chiffre)' });
      }
      
      asyncLib.waterfall([(done)=>{
        models.Agent.findOne({
          attributes: ['name','lastname','firstname','gender'],
          where: {
             name: name, 
             lastname:lastname,
             firstname:firstname,
             gender:gender
          }
        })
        .then((agent)=>{
          if(agent){return res.status(400).json({'error':'cet agent existe déjà'})}
          else{
            bcrypt.hash(password, 5,( err, bcryptedPassword )=>{
                models.Agent.create({
                name : name,
                lastname:lastname,
                firstname:firstname,
                gender:gender,
                contact:contact,
                email:email,
                address:address,
                profil:profil,
                username:username,
                password:bcryptedPassword,
                fonctionId:fonctionId,
                serviceId:serviceId
              }).then((newAgent)=>{
                if(newAgent){return res.status(200).json({'success':newAgent})}
              }).catch((error)=>{
                if(error){return res.status(400).json({'error':'enregistrement a échoué!'})}})
            });
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
      var username      = req.body.username;
      var password      = req.body.password;
      var profil        = req.body.profil;
      var serviceId     = req.body.serviceId;
      var fonctionId    = req.body.fonctionId;

      if(id === null){return res.status(400).json({'error':'identifiant non valide'})}
       asyncLib.waterfall([(done)=>{
         models.Agent.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((agent)=>{
           if(!agent){return res.status(400).json({'error':'cet agent n existe pas'})}
           else{
               bcrypt.hash(password ? password : '',5,(err,bcryptedPassword)=>{
                  agent.update({
                    name: (name ? name : agent.name),
                    lastname: (lastname ? lastname : agent.lastname),
                    firstname: (firstname ? firstname : agent.firstname),
                    gender: (gender ? gender : agent.gender),
                    contact: (contact ? contact : agent.contact),
                    email: (email ? email : agent.email),
                    address: (address ? address : agent.address),
                    username: (username ? username : agent.username),
                    password: (password ? bcryptedPassword : agent.password),
                    profil: (profil ? profil : agent.profil),
                    serviceId: (serviceId ? serviceId : agent.serviceId),
                    fonctionId: (fonctionId ? fonctionId : agent.fonctionId)
                  }).then((agent)=>{
                    if(!agent){return res.status(400).json({'error':'mise à jour a échoué'})}
                    else{return res.status(200).json({'success':agent})}
                  })
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

      if(id === null){return res.status(400).json({'error':'veuillez choisir l agent'})}
       asyncLib.waterfall([(done)=>{
         models.Agent.findOne({
           attributes:['id'],
           where:{id:id}
         }).then((agent)=>{
           if(!agent){return res.status(400).json({'error':'cet agent n existe pas'})}
           else{
              agent.destroy();
              return res.status(200).json({'success':'agent supprimé'});
           }
         }).catch((error)=>{
           if(error){return res.status(400).json({'error':'connexion a échoué'})}
         })
       }])
    },

    listAgents:(req,res)=>{
        models.Agent.findAll({
          order:[['name','ASC'],['lastname','ASC'],['firstname','ASC']],
          include: [{model: models.Service},{model:models.Fonction}]
        }).
        then((agents)=>{if (agents) {res.status(200).json(agents)} 
          else {res.status(404).json({ "error": "agents non trouvés" })}
        }).
        catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

    },

    listAgentsById:(req,res)=>{
      id = req.params.id
      models.Agent.findAll({
          where: { id: id },
          include: [{model: models.Service},{model:models.Fonction}]
      }).
      then((agents)=>{if (agents) {res.status(200).json(agents)} 
        else {res.status(404).json({ "error": "agent non trouvé" })}
      }).
      catch((error)=>{ res.status(500).json({ "error": "les champs invalides" })})

  }
}
