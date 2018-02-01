var express = require('express');
var router = express.Router();

var ctrlLolis = require('../controllers/lolis.controllers.js');
var ctrlComments = require('../controllers/comments.controllers.js');

//lolis routes
router
  .route('/lolis')
  .get(ctrlLolis.lolisGetAll)
  .post(ctrlLolis.lolisAddOne);

router
  .route('/lolis/:loliId')
  .get(ctrlLolis.lolisGetOne)
  .put(ctrlLolis.lolisUpdateOne);

//comment routes
router
  .route('/lolis/:loliId/comments')
  .get(ctrlComments.commentsGetAll)
  .post(ctrlComments.commentsAddOne);

router
  .route('/lolis/:loliId/comments/:commentId')
  .get(ctrlComments.commentsGetOne)
  .put(ctrlComments.commentsUpdateOne);


module.exports = router;
