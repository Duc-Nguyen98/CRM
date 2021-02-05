const express = require('express');
const router = express.Router();

const usersModel = require('../model/schemasUsers');


/* !GET home page login. */
router.get('/', async function (req, res, next) {
  res.render('./pages/others/login', { layout: './pages/others/login' })
});

/* 
!POST login
  -u localhost:xxxx/
*/
router.post('/', async function (req, res, next) {
  let account = req.body.account;
  let password = req.body.password;
  // console.log(account, password)
  await usersModel.findOne({
    account: account,
    password: account,
    softDelete:0
  })
    .then(data => {
      // console.log(data)
      if (data) {
        let token = jwt.sign({
          _id: data._id
        }, 'mk');
        res.cookie('token', token);
        return res.redirect('/customer');
        // return res.json(data)
      } else {
        // return res.json('fail');
        return res.redirect('/')
      }
    })
    .catch(err => {
      // res.status(500);
      res.send(err)
    })
});

/* 
!GET logout
  -u localhost:xxxx/student/logout
*/
router.get('/logout',  (req, res, next)=> {
  res.clearCookie('token');
  res.redirect('/');
});



module.exports = router;
