var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var loliData = require('../data/loli-data.json');

module.exports.lolisGetAll = function(req, res) {

  var db = dbconn.getDb();
  var collection = db.collection('lolis');

  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found lolis", docs);
      res
        .status(200)
        .json(docs);
    });

};

module.exports.lolisGetOne = function(req, res) {
  var db = dbconn.getDb();
  var collection = db.collection('lolis');

  var loliId = req.params.loliId;
  console.log("GET the loliId", loliId);

  collection
    .findOne({
      _id: ObjectId(loliId)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
    });

};

module.exports.lolisAddOne = function(req, res) {
  var db = dbconn.getDb();
  var collection = db.collection('lolis');
  var newLoli;

  console.log("POST new loli");

  if (req.body && req.body.name && req.body.age) {
    collection.findOne({
      name: req.body.name
    }, function(err, doc) {
      if (!doc) {
        console.log(req.body.name);
        newLoli = req.body;
        newLoli.age = parseInt(req.body.age, 10);
        collection
          .insertOne(newLoli, function(err, response) {
            console.log(response);
            console.log(response.ops);
            res
              .status(201)
              .json(response.ops);
          });
      } else {
        console.log("Duplicate");
        res
          .status(400)
          .json({
            message: "Duplicate"
          });
      }
    });

  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({
        message: "Required data missing from body"
      });
  }

};
