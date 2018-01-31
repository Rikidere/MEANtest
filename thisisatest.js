db.lolis.update(
  {},
  {
    $unset : {
      "comments" : {}
    }
  },
  {
    multi : true
  }
)

db.lolis.update(
  {},
  {
    $set : {
      "comments" : {
        "_id" : ObjectId(),
        "name" : "rikidere",
        "comment" : "testcomment"
      }
    }
  },
  {
    multi : true
  }
)
