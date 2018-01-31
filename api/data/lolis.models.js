var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    comment : {
      type : String,
      required : true
    },
    createdOn : {
      type : Date,
      "default" : Date.now
    }
});

var loliSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  age : Number,
  description : String,
  photos : [String],
  comments : [commentSchema]
});

mongoose.model('Loli', loliSchema, 'lolis');
