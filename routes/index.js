const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'boardSystem' });
});

router.get('/board', function(req, res, next) {
  res.render('show');
});

// router.get('/board', function(res, req, next) {
//   models.post.findAll().then( result => {
//     res.render('show', {
//       posts: result 
//     });
//   });
// });

router.get('/borad', function(req, res, next) {
  models.post.findAll({
    where: {writer: 'hyunlee'}
  })
  .then(result => {
    res.render('show', {
      post: result
    });
  })
  .catch(function(err) {
    console.log(err);
  });
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


router.get('/board/id', function(req, res, next) {
  let postID = req.params.id;

  models.post.findOne({
    where: {id : postID}
  })
  .then(result => {
    res.render('edit', {
      post: result
    });
  })
  .catch(err => {
    console.log('데이터조회에러')
  });
});


router.put('/board/:id', function(req, res, next) {
  let postID = req.params.id;
  let body = req.body;

  models.post.update({
    title: body.editTitle,
    writer: body.editWriter
  }, {
    where: {id: postID}
  })
  .then(result => {
    console.log('data edit ok');
    res.redirect('/board');
  })
  .catch(err => {
    console.log('data edit failed...sorry..');
  });
});


router.delete('/board/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.destory({
    where: {id: postID}
  })
  .then(result => {
    res.redirect('/board')
  })
  .catch(err=> {
    console.log('data delete failed...');
  });
});



module.exports = router;


