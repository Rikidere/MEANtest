var express = require('express');
var router = express.Router();

var ctrlLolis = require('../controllers/lolis.controllers.js');

router
  .route('/lolis')
  .get(ctrlLolis.lolisGetAll);

  router
    .route('/lolis/:loliId')
    .get(ctrlLolis.lolisGetOne);

module.exports = router;
