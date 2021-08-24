const express = require('express');
const router = express.Router();
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function(req, file ,cb){
      cb(null, "upload/")
  },
  filename: function(req, file, cb){
      cb(null, file.originalname + " - " + Date.now())
  }
})

let upload = multer({
  storage: storage
});

router.get('/show', function(req, res, next) {
  res.render('board')
});

router.post('/create', upload.single('imgFile'), function(req, res, next) {
  let file = req.file
  
  let result = {
    originalName: file.originalname,
    size: file.size,
  }

  res.json(result);
});

module.exports = router;