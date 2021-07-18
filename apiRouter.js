// Imports
var express      = require('express');

var fonctionsCtrl    = require('./routes/fonctionsCtrl');
var servicesCtrl    = require('./routes/servicesCtrl');

// Router
exports.router = (function() {
  var apiRouter = express.Router();

  // Fonctions routes
  apiRouter.route('/fonctions/add/').post(fonctionsCtrl.add);

  // Services routes
  apiRouter.route('/services/add/').post(servicesCtrl.add);

  return apiRouter;
})();