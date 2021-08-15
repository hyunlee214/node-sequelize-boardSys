const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'boardSystem' });
});


// router.get('/board', function(req, res, next) {
//   models.post.findAll({
//     where: {writer: 'hyunlee'}
//   })
//   .then(result => {
//     res.render('show', {
//       posts: result
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });

router.get('/board', async function(req, res, next) {
  let result = await models.post.findAll();
  if (result){
    for(let post of result){
      let result2 = await models.post.findOne({
        include: {
          model: models.reply,
          where: {
            postId: post.id
          }
        }
      })
      if(result2){
        post.replies = result2.replies
      }
    } 
  }
  res.render("show", {
    posts : result
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
      res.redirect('/show');
    })
    .catch(err => {
      console.log('data input failed,,sorry,,');
    })
});


router.get('/board/:id', function(req, res, next) {
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
    console.log('데이터조회에러');
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
  .catch(err => {
    console.log('data delete failed...');
  });
});


router.post('/reply/:postID', function(req, res, next) {
  let postID = req.params.postID;
  let body = req.body;

  models.reply.create({
    postId: postID,
    writer: body.replyWriter,
    content: body.replyContent
  })
  .then( result => {
    res.redirect('/board');
  })
  .catch(err => {
    console.log(err);
  });
});

module.exports = router;



