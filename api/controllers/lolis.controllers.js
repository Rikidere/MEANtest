var loliData = require('../data/loli-data.json');

module.exports.lolisGetAll = function(req, res) {
  console.log("GET the lolis");
  console.log(req.query);

  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  var returnData = loliData.slice(offset,offset+count);

  res
    .status(200)
    .json(returnData);
};

module.exports.lolisGetOne = function(req, res) {
  var loliId = req.params.loliId;
  var thisLoli = loliData[loliId];
  console.log("GET the loliId", loliId);
  res
    .status(200)
    .json(thisLoli);
};

module.exports.lolisAddOne = function(req, res) {
  console.log("POST new loli");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};
