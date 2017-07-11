var https = require("https");



var search = function (query, page) {
  console.log("test")
  var promise = new Promise (function (resolve, reject) {
    
    var imgur_api = "https://api.imgur.com/3/";
    var client_id = process.env.CLIENTID;
    

    //https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=cats
    var options = {
      hostname: 'api.imgur.com',
      path: '/3/gallery/search/time/' + page + '/?q=' + query,
      headers: {'Authorization': 'Client-ID ' + client_id},
      method: 'GET'
    };

    
    
    var req = https.request(options, function(res) {
      var chunks = [];
      
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(body.toString());
      });
      
      
    });

    req.on('error', function(e) {
      console.error(e);
    });

    req.end();
    
    
  });
  
  return promise;
  
}


var getAlbumImages = function (album_hash) {
  var promise = new Promise (function (resolve, reject) {
    
    var imgur_api = "https://api.imgur.com/3/";
    var client_id = process.env.CLIENTID;
    
    var options = {
      hostname: 'api.imgur.com',
      path: '/3/album/' + album_hash + "/images",
      headers: {'Authorization': 'Client-ID ' + client_id},
      method: 'GET'
    };
    
    var req = https.request(options, function(res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(body.toString());
      });
      
      
    });

    req.on('error', function(e) {
      console.error(e);
    });

    req.end();
    
    
  });
  
  return promise;
}















var getImage = function (image_id) {
  var promise = new Promise (function (resolve, reject) {
    
    var imgur_api = "https://api.imgur.com/3/";
    var client_id = process.env.CLIENTID;
    
    
        //https://api.imgur.com/3/gallery/image/{{galleryImageHash}}
    var options = {
      hostname: 'api.imgur.com',
      path: '/3/image/' + image_id,
      headers: {'Authorization': 'Client-ID ' + client_id},
      method: 'GET'
    };
    
    var req = https.request(options, function(res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        resolve(body.toString());
      });
      
      
    });

    req.on('error', function(e) {
      console.error(e);
    });

    req.end();
    
    
  });
  
  return promise;
  
}

module.exports = {
  search: search,
  getImage: getImage,
  getAlbumImages: getAlbumImages
}