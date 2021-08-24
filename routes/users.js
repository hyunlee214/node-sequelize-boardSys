/*
const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');

router.get('/sign_up', function(req, res, next) {
  res.render('user/signup');
});

router.post("/sign_up", async function(req, res, next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: body.password,
    salt: salt
  })
  res.redirect('/user/sign_up');
})

router.get('/', function(req, res, next) {
  res.send('로그인성공');
});

router.get('/login', function(req, res, next) {
  let session = req.session;

  res.render('user/login', {
    session : session
  });
});

router.post('/login', async function(req, res, next) {
  let body = req.body;

  let result = await models.user.findOne({
    where: {
      email : body.userEmail
    }
  });

  let dbPassword = result.dataVaules.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

  if (dbPassword === hashPassword) {
    console.log('비밀번호가 일치합니다');

    req.session.email = body.userEmail;
    res.redirect('/user');
  }
  else {
    console.log('비밀번호가 다릅니다');
    
    res.redirect('/user/login');
  }
});



module.exports = router;





// crypto.randomBytes(64, (err, salt) => {
//   crypto.pbkdf2('비밀번호', salt.toSring('base64'), 100000, 64, 'sha512', (err, key) => {
//     console.log(key.toString('base64'));
//   });
// });

*/

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const models = require('../models');

router.get('/sign_up', function(req, res, next) {
  res.render('user/signup');
});

router.post('/sign_up', async function(req, res, next) {
  let body = req.body;

  //crypto 모듈 사용 => hashPassword생성

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";      
  // salt적용해서 암호화 강화 (현재 시간 * 랜덤값으로 문자열 생성)
  let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');
  // 암호화 강화를 위해 'sha512 알고리즘' 사용

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,   
    //password: hashPassword,                
    password:body.password,                  
    salt: salt                    
  })
    res.redirect('/user/sign_up');
  })


  router.get('/', function(req, res, next) {
    if (req.cookies) {
      console.log(req.cookies);
    }
    res.send('환영합니다');
  });

  router.get('/login', function(req, res, next) {
      let session = req.session;

      res.render('user/login', {
        session : session
      });
  });

  router.post('/login', async function(req, res, next) {
    let body = req.body;

    let result = await models.user.findOne({
      where: {
        email: body.userEmail
      }
    });

    let dbPassword = result.dataValues.password;
    let inputPassword = body.password;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if(dbPassword === hashPassword){
        console.log("비밀번호 일치");

        req.session.email = body.userEmail;
        res.redirect('/user');
    }
    else{
        console.log("비밀번호 불일치");
        res.redirect('/user/login');
  }
});

module.exports = router;
