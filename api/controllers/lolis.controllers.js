var loliData = require('../data/loli-data.json');

module.exports.lolisGetAll = function(req, res) {
  console.log("GET the lolis");
  res
    .status(200)
    .json(loliData);
};

module.exports.lolisGetOne = function(req, res) {
  var loliId = req.params.loliId;
  var thisLoli = loliData[loliId];
  console.log("GET the loliId", loliId);
  res
    .status(200)
    .json(thisLoli);
};
