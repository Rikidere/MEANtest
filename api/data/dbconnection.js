var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/mean-loli';

var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = db;
    console.log("DB connection open", db);
  });
  // set _connection
};

var getConnection = function() {
  return _connection;
};

var getDb = function() {
  return _connection.db('mean-loli');
};
module.exports = {
  open: open,
  getConnection: getConnection,
  getDb: getDb
};
