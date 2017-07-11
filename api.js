var express = require('express');
var router = express.Router();
var imgur = require('./imgur.js');
var database = require('./database.js');


router.get('/imagesearch/:search', function (req, res) {
  
  var search = req.params.search;
  var offset = req.query.offset;
  
  var imagesearch = imgur.search(search, offset);

  var images = getImages(imagesearch);
  
  database.addSearch(search);
  
  images.then (function (data) {
    res.json(data);
  
  })
  
})

router.get('/latest/imagesearch', function (req, res) {
  
  var latest = database.getLatest();
  latest.then (function (data) {
    
    var latest_array = data;
    var new_array = latest_array.reverse().slice(0,5);
    
    res.json(new_array);
  })
  
})


function getAlbumImages(album) {
 
  var albumHash = album.id;
  
  
  var promise = new Promise(function (resolve, reject) {
    
    imgur.getAlbumImages(albumHash).then (function (images) {
      
      var real_images = [];
      
      var new_images = JSON.parse(images).data
      
      for (var i = 0; i < new_images.length; i ++) {
        var image = new_images[i].link
        real_images.push(image);
      }
      
      var finished_image = {
        title: album.title,
        link: album.link,
        images: real_images
      }
      
      resolve(finished_image);
    })
    
  })
  
  return promise;
  
}


function getImages(image_search) {
  var promise = new Promise(function (resolve, reject) {
    
    image_search.then(function (data) {
      var data = JSON.parse(data).data;
      
      var new_list = [];
      
      for (var i = 0; i < data.length; i ++) {
        var album = data[i];
        
        if (album.is_album) {
          new_list.push(album);
        }else {
          continue;
        }
      }
      
      var finished_images = [];
      
      var finished_images_length = new_list.length;
      
      
      for (var i = 0; i < finished_images_length; i ++) {
        
        var elem = new_list[i];
        
        var new_elem = getAlbumImages(elem);
        
        new_elem.then (function (data) {
          finished_images.push(data);
          if (finished_images.length == finished_images_length) {
            resolve(finished_images);
          }
        })
        
        
      }

    })
    
    
    
  })
  
  return promise;
  
}

module.exports = router;