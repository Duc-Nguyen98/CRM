const express = require('express');
const router = express.Router();
const path = require('path');

const itemsModel = require('./../model/schemasCustom')


/* GET home page. */
router.get('/', function (req, res, next) {
  const taskOne = itemsModel
    .find({ softDelete: '0' })
    .limit(10)
    .sort({ customerName: 1 })
  // res.json(data)
  // 
  const taskTwo = itemsModel
    .countDocuments({ softDelete: '1' })

  Promise.all([taskOne, taskTwo]).then(([dataOne, dataTwo]) => {
    res.render('./pages/customer', {
      items: dataOne,
      restore: dataTwo
    })
  })

});

/* 
  *GET form add || edit 
*/

router.get('/form/(:id)?', function (req, res, next) {
  const _id = req.params.id;
  const objectNull = {
    customerName: '',
    customerAvatar: '',
    customerEmail: '',
    customerGender: '',
    customerDate: '',
    customerTelephone: '',
    customerJob: '',
    customerAddress: '',
    customerGroupId: ''
  }
  if (_id == null) {
    res.render('./pages/form', {
      items: objectNull,
    })
  } else {
    itemsModel
      .findById({ _id: _id })
      .then(data => {
        res.render('./pages/form', {
          items: data,
        })
        // res.json(data)
      })
  }
});

router.post('/form/(:id)?', async function (req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  let item = Object.assign(req.body);
  let imgAvatar = req.files.customerAvatar;
  await imgAvatar.mv(path.resolve('public/images/avatar', imgAvatar.name));
  // console.log(imgAvatar);

  if (id == '' || id == null || id == undefined) {
    item.created = {
      nameCreateAt: 'admin',
      time: Date.now()
    }
    item.customerAvatar = 'images/avatar/' + imgAvatar.name;
    await itemsModel.create(item, (err, data) => {
      // res.json(item);
      res.redirect('/');
    });
  } else {
    await itemsModel.updateOne({ _id: id }, {
      customerName: item.customerName,
      customerAvatar: 'images/avatar/' + imgAvatar.name,
      customerEmail: item.customerEmail,
      customerGender: item.customerGender,
      customerDate: item.customerDate,
      customerTelephone: item.customerTelephone,
      customerJob: item.customerJob,
      customerAddress: item.customerAddress,
      customerGroupId: item.customerGroupId,
      modified: {
        nameUpdateAt: 'admin',
        time: Date.now()
      }
    }, (err, data) => {
      res.redirect('/');
      // res.json(data)
    });
  }

})




/* GET details an record. */
router.get('(/trash)?/details/:id', async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel
    .findById({ _id: _id })
    .then(data => {
      res.render('./pages/detailCustomer', {
        items: data,
      })
      // res.json(data)
    })
});


/* DELETE delete to trash restore an customer. */
router.get('/delete/:id', async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel.updateOne({ _id: _id }, {
    softDelete: "1",
  }, (err, data) => {
    res.redirect('back');
    // res.json(data)
  });
});


/* view record to trash restore an customer. */
router.get('/trash/viewRestore', async function (req, res, next) {
  await itemsModel
  .find({ softDelete: '1' })
  .sort({ customerName: 1 })
  .then(data =>{
    res.render('./pages/restoreCustomer', {
      items: data,
    })
  })
});

/* RESTORE record to table an customer. */
router.get('/trash/restore/:id', async function (req, res, next) {
  const _id = req.params.id;
  console.log(_id);
  await itemsModel.updateOne({ _id: _id }, {
    softDelete: "0",
  }, (err, data) => {
    res.redirect('/');
    // res.json(data)
  });
});


/* Delete from Trash Restore */
router.get('/trash/delete/:id', async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel
  .deleteOne({ _id: _id })
  .then(data => {
    res.status(201).redirect('back');
    // res.json(data)
  })
});




module.exports = router;
