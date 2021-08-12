const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/board', function(req, res, next) {
  res.render('show');
});

router.post('/board', function(req, res, next) {
  let body = req.body;

  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  }) 
    .then(result => {
      console.log ('data input ok');
      res.redirect('./board');
    })
    .catch(err => {
      console.log('data input failed,,sorry,,');
    })
});

module.exports = router;


