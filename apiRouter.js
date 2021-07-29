// Imports
var express               = require('express');

var fonctionsCtrl         = require('./routes/fonctionsCtrl');
var servicesCtrl          = require('./routes/servicesCtrl');
var agentsCtrl            = require('./routes/agentsCtrl');
var correspondantsCtrl    = require('./routes/correspondantsCtrl');
var piecejointesCtrl      = require('./routes/piecejointesCtrl');
var audiancesCtrl         = require('./routes/audiancesCtrl');

// Router
exports.router = (function() {
  var apiRouter = express.Router();

  // Fonctions routes
  apiRouter.route('/fonctions/add/').post(fonctionsCtrl.add);
  apiRouter.route('/fonctions/update/').put(fonctionsCtrl.update);
  apiRouter.route('/fonctions/delete/:id').delete(fonctionsCtrl.delete);
  apiRouter.route('/fonctions/').get(fonctionsCtrl.listFonctions);
  apiRouter.route('/fonctions/:id').get(fonctionsCtrl.listFonctionsById);

  // Services routes
  apiRouter.route('/services/add/').post(servicesCtrl.add);
  apiRouter.route('/services/update/').put(servicesCtrl.update);
  apiRouter.route('/services/delete/:id').delete(servicesCtrl.delete);
  apiRouter.route('/services/').get(servicesCtrl.listServices);
  apiRouter.route('/services/:id').get(servicesCtrl.listServicesById);

  //Agents routes
  apiRouter.route('/agents/register/').post(agentsCtrl.register);
  apiRouter.route('/agents/update/').put(agentsCtrl.update);
  apiRouter.route('/agents/delete/:id').delete(agentsCtrl.delete);
  apiRouter.route('/agents/').get(agentsCtrl.listAgents);
  apiRouter.route('/agents/:id').get(agentsCtrl.listAgentsById);

  //Correspondances routes
  apiRouter.route('/correspondants/add/').post(correspondantsCtrl.add);
  apiRouter.route('/correspondants/update/').put(correspondantsCtrl.update);
  apiRouter.route('/correspondants/delete/:id').delete(correspondantsCtrl.delete);
  apiRouter.route('/correspondants/').get(correspondantsCtrl.listCorrespondants);
  apiRouter.route('/correspondants/:id').get(correspondantsCtrl.listCorrespondantsById);

  //PieceJointes routes
  apiRouter.route('/piecejointes/add/').post(piecejointesCtrl.add);
  apiRouter.route('/piecejointes/update/').put(piecejointesCtrl.update);
  apiRouter.route('/piecejointes/delete/:id').delete(piecejointesCtrl.delete);
  apiRouter.route('/piecejointes/').get(piecejointesCtrl.listPieceJointes);
  apiRouter.route('/piecejointes/:id').get(piecejointesCtrl.listPieceJointesById);

  //Audiances routes
  apiRouter.route('/audiances/add/').post(audiancesCtrl.add);
  apiRouter.route('/audiances/update/').put(audiancesCtrl.update);
  apiRouter.route('/audiances/delete/:id').delete(audiancesCtrl.delete);
  apiRouter.route('/audiances/').get(audiancesCtrl.listAudiances);
  apiRouter.route('/audiances/:id').get(audiancesCtrl.listAudiancesById);
  apiRouter.route('/audiances/:is_working').get(audiancesCtrl.listAudiancesByIsWorking);
  apiRouter.route('/audiances/:is_signal').get(audiancesCtrl.listAudiancesByIsSignal);

  return apiRouter;
})();