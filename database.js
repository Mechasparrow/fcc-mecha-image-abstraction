var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongo_user = process.env.MONGOUSER;
var mongo_password = process.env.MONGOPASSWORD;

var url = "mongodb://" + mongo_user + ":" + mongo_password + "@ds147872.mlab.com:47872/mechaimage"

MongoClient.connect(url, function (err, db) {
  
  assert.equal(null, err);
  console.log("connected to server");
  
  db.close();
  
})


module.exports = {
  
  getLatest: function () {
     
    var promise = new Promise(function (resolve, reject) {
    
        MongoClient.connect(url, function (err, db) {
      
        var searchs = db.collection('searchs');
      
        searchs.find({}, {_id: 0}).toArray(function (err, docs) {
          console.log("Found these records");
          console.log(docs);

          db.close();
          resolve(docs);
        
        })
      
      
      })
      
      
      
      
      
    })
    
    return promise; 
  },
  
  addSearch: function (search_term) {
    
    var timestamp = new Date().toISOString();
    console.log(timestamp);
    
    MongoClient.connect(url, function (err, db) {
      
        var searchs = db.collection('searchs');
        
        searchs.insert({
          term: search_term,
          timestamp: timestamp
        })
      
        db.close();
        
    })
    
    
    
    
  }
  
  
}