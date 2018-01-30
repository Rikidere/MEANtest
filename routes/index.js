var express = require('express');
var router = express.Router();

router
  .route('/json')
  .get(function(req, res) {
    console.log("GET the homepage");
    res
    .status(200)
    .json({"jsonData" : true});
  })
  .post(function(req, res) {
    console.log("POST the homepage");
    res
    .status(200)
    .json({"jsonData" : "POST received"});
  });

module.exports = router;
