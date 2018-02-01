var mongoose = require('mongoose');
var Loli = mongoose.model('Loli');

module.exports.lolisGetAll = function(req, res) {

  var offset = 0;
  var count = 5;
  var maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        message: "querystring count and offset should be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        message: "Count limit of 10 exceeded"
      });
    return;
  }

  Loli
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, lolis) {
      if (err) {
        console.log("Error finding lolis");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found lolis", lolis.length);
        res
          .json(lolis);
      }
    });

};

module.exports.lolisGetOne = function(req, res) {
  var loliId = req.params.loliId;
  console.log("GET the loliId", loliId);

  Loli
    .findById(loliId)
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        console.log("Error finding loli");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = "Loli ID not found";
      }
      res
        .status(response.status)
        .json(response.message);
    });

};

var _splitArray = function(input) {
  var output;
  var splitter = ";";
  if (input && input.length > 0) {
    splitter = input.indexOf(" ") !== -1 ? " " : splitter;
    output = input.split(splitter);
  } else {
    output = [];
  }
  return output;
};

module.exports.lolisAddOne = function(req, res) {

  Loli
    .create({
      name: req.body.name,
      age: parseInt(req.body.age, 10),
      description: req.body.description,
      photos: _splitArray(req.body.photos)
    }, function(err, loli) {
      if (err) {
        console.log("Error creating loli");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Loli created", loli);
        res
          .status(201)
          .json(loli);
      }
    });

};

module.exports.lolisUpdateOne = function(req, res) {
  var loliId = req.params.loliId;
  console.log("GET the loliId", loliId);

  Loli
    .findById(loliId)
    .select("-comments")
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        console.log("Error finding loli");
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = "Loli ID not found";
      }
      if (response.status != 200) {
        res
          .status(response.status)
          .json(response.message);
      } else {
        doc.name = req.body.name;
        doc.age = parseInt(req.body.age, 10);
        doc.description = req.body.description;
        doc.photos = _splitArray(req.body.photos);
        doc.save(function(err, loliUpdated) {
          if (err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
      }
    });
};

module.exports.lolisDeleteOne = function(req, res) {
  var loliId = req.params.loliId;

  Loli
    .findByIdAndRemove(loliId)
    .exec(function(err, loli) {
      if (err) {
        res
          .status(404)
          .json(err);
      } else {
        console.log("Loli deleted, id:", loliId);
        res
          .status(204)
          .json();
      }
    });
};
