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
