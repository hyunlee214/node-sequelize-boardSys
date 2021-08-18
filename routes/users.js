const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');

/* GET users listing. */
router.get('/sign_up', function(req, res, next) {
  res.render('user/signup');
});

router.post("/sign_up", async function(req,res,next){
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

  let result = models.user.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt
  })
  .then( result => {
    res.redirect("/users/sign_up");
  })
  .catch( err => {
    console.log(err)
  })
})



module.exports = router;





// crypto.randomBytes(64, (err, salt) => {
//   crypto.pbkdf2('비밀번호', salt.toSring('base64'), 100000, 64, 'sha512', (err, key) => {
//     console.log(key.toString('base64'));
//   });
// });