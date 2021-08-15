// const express = require('express');
// const models = require('../models');
// const router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'boardSystem' });
// });

// // router.get('/board', function(req, res, next) {
// //   res.render('show');
// // });

// router.get('/board', function(res, req, next) {
//   models.post.findAll().then( result => {
//     res.render('show', {
//       posts: result 
//     });
//   });
// });

// router.get('/edit/:id', function(res, req, next) {
//   let postID = req.params.id;

//   models.post.findOne({
//     where: {id: postID}
//   })
//   .then(result => {
//     res.render('edit', {
//       post: result
//     });
//   })
//   .catch(err => {
//     console.log('data read failed,,');
//   });
// });

// router.put('/board/:id', function(req, res, next) {
//   let postId = req.params.id;
//   let body = req.body;

//   models.post.update({
//     title: body.editTitle,
//     writer: body.editWriter
//   }, {
//     where: {id: postID}
//   })
//   .then(result => {
//     console.log('data edit ok');
//     res.redirect('/board');
//   })
//   .catch(err => {
//     console.log('data edit failed...sorry..');
//   });
// });

// router.post('/board', function(req, res, next) {
//   let body = req.body;

//   models.post.create({
//     title: body.inputTitle,
//     writer: body.inputWriter
//   }) 
//     .then(result => {
//       console.log ('data input ok');
//       res.redirect('./board');
//     })
//     .catch(err => {
//       console.log('data input failed,,sorry,,');
//     })
// });

// router.delete('/board/:id', function(req, res, next) {
//   let postID = req.params.id;

//   models.post.destory({
//     where: {id: postID}
//   })
//   .then(result => {
//     res.redirect('/board')
//   })
//   .catch(err=> {
//     console.log('data delete failed...');
//   });
// });


// module.exports = router;



const express = require('express');
const models = require('../models');
const router = express.Router();



// 게시글 목록
router.get('/board', function(req, res, next) {
  models.post.findAll({
    where: {writer: "victolee"}
  })
      .then( result => {
        res.render("show", {
          posts: result
        });
      })
      .catch(function(err){
        console.log(err);
      });
});

// 게시글 등록
router.post('/board', function(req, res, next) {
  let body = req.body;

  models.post.create({
    title: body.inputTitle,
    writer: body.inputWriter
  })
  .then( result => {
    console.log("데이터 추가 완료");
    res.redirect("/show");
  })
  .catch( err => {
    console.log("데이터 추가 실패");
  })
});

// 게시글 조회
router.get('/board/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.findOne({
    where: {id: postID}
  })
  .then( result => {
    res.render("edit", {
      post: result
    });
  })
  .catch( err => {
    console.log("데이터 조회 실패");
  });
});

// 게시글 수정
router.put('/board/:id', function(req, res, next) {
  let  postID = req.params.id;
  let body = req.body;

  models.post.update({
    title: body.editTitle,
    writer: body.editWriter
  },{
    where: {id: postID}
  })
  .then( result => {
    console.log("데이터 수정 완료");
    res.redirect("/board");
  })
  .catch( err => {
    console.log("데이터 수정 실패");
  });
});

// 게시글 삭제
router.delete('/board/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.destroy({
    where: {id: postID}
  })
  .then( result => {
    res.redirect("/board")
  })
  .catch( err => {
    console.log("데이터 삭제 실패");
  });
});

// 댓글 등록
router.post("/reply/:postID", function(req, res, next){
  let postID = req.params.postID;
  let body = req.body;

  models.reply.create({
    postId: postID,
    writer: body.replyWriter,
    content: body.replyContent
  })
  .then( results => {
    res.redirect("/board");
  })
  .catch( err => {
    console.log(err);
  });
});

module.exports = router;