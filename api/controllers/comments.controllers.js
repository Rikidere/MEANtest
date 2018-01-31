var mongoose = require('mongoose');
var Loli = mongoose.model('Loli');

module.exports.commentsGetAll = function (req, res) {
  var loliId = req.params.loliId;
  console.log("GET the loliId", loliId);

  Loli
    .findById(loliId)
    .select('comments')
    .exec(function(err, doc) {
      res
        .status(200)
        .json(doc.comments);
    });

};

module.exports.commentsGetOne = function (req, res) {
  var loliId = req.params.loliId;
  var commentId = req.params.commentId;
  console.log("GET the loliId", loliId);
  console.log("GET the commentId", commentId);

  Loli
    .findById(loliId)
    .select('comments')
    .exec(function(err, loli) {
      console.log("Returned loli", loli);
      var comment = loli.comments.id(commentId);
      res
        .status(200)
        .json(comment);
    });
};

var _addComment = function (req, res, loli) {

  loli.comments.push({
    name : req.body.name,
    comment : req.body.comment
  });

  loli.save(function (err, loliUpdated) {
    if(err) {
      res
        .status(500)
        .json(err);
      } else {
        res
          .status(201)
          .json(loliUpdated.comments[loliUpdated.comments.length - 1]);
      }
  });

};

module.exports.commentsAddOne = function (req, res) {
  var loliId = req.params.loliId;
  console.log("GET the loliId", loliId);

  Loli
    .findById(loliId)
    .select('comments')
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : []
      };
      if (err) {
        console.log("Error finding hotel")
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        console.log("Loli id not found in database", id);
        response.status = 404;
        response.message = {
          message : "Loli ID not found" + id
        };
      }
      if (doc) {
        _addComment(req, res, doc);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });

};
