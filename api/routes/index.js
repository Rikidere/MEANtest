var express = require('express');
var router = express.Router();

var ctrlLolis = require('../controllers/lolis.controllers.js');
var ctrlComments = require('../controllers/comments.controllers.js');

router
  .route('/lolis')
  .get(ctrlLolis.lolisGetAll);

router
  .route('/lolis/:loliId')
  .get(ctrlLolis.lolisGetOne);

router
  .route('/lolis/new')
  .post(ctrlLolis.lolisAddOne);

router
  .route('/lolis/:loliId/comments')
  .get(ctrlComments.commentsGetAll);

router
  .route('/lolis/:loliId/comments/:commentId')
  .get(ctrlComments.commentsGetOne);


module.exports = router;
