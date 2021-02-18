const express = require('express');
const router = express.Router();
const path = require('path');

const itemsModel = require('../model/schemasCustom');
const paramsHelper = require('../helper/params');


const checkAuthentication = require('../utils/checkAuthen')

/*! GET home page. */
router.get('/', checkAuthentication, async function (req, res, next) {
  const configPagination = {
    totalItemsPerPage: 10,
    currentPage: 1,
    totalItems: 1,
    pageRanges: 4
  }
  configPagination.currentPage = parseInt(paramsHelper.getParams(req.query, 'page', 1));


  let sortField = req.session.sort_field;
  let sortType = req.session.sort_type;


  let sort = {};
  sort[sortField] = sortType;


  await itemsModel // !count record if softDelete: '0'
    .countDocuments({ softDelete: '0' })
    .then(data => {
      configPagination.totalItems = data
    })

  const taskOne = itemsModel   //!view record limit 10 
    .find({ softDelete: '0' })
    .sort(sort)
    .skip((configPagination.currentPage - 1) * configPagination.totalItemsPerPage)
    .limit(configPagination.totalItemsPerPage)

  const taskThree = itemsModel // !count record if softDelete: '1'
    .countDocuments({ softDelete: '1' })

  // console.log(userObj);

  Promise.all([taskOne, taskThree]).then(([dataOne, dataThree]) => {
    res.render('./pages/customers/customer', {
      userObj: userObj, //? get value object from checkAuthentication
      items: dataOne,
      countRestore: dataThree,
      pagination: configPagination,
      sortField: sortField,
      sortType: sortType
    })
  })

});

/* 
  *GET form add || edit 
*/

router.get('/form/(:id)?', checkAuthentication, function (req, res, next) {
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
    res.render('./pages/customers/form', {
      items: objectNull,
    })
  } else {
    itemsModel
      .findById({ _id: _id })
      .then(data => {
        res.render('./pages/customers/form', {
          items: data,
        })
        // res.json(data)
      })
  }
});

router.post('/form/(:id)?', checkAuthentication, async function (req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  let id = req.params.id;
  let item = Object.assign(req.body);


  if (id == '' || id == null || id == undefined) {
    let imgAvatar = {
      name: ''
    };
    if (req.files) {
      imgAvatar = req.files.customerAvatar;
      await imgAvatar.mv(path.resolve('public/images/avatar', imgAvatar.name));
    }

    item.created = {
      nameCreateAt: userObj.name,
      time: Date.now()
    };
    item.modified = {
      nameUpdateAt: userObj.name,
      time: Date.now()
    };
    item.softDelete = '0';
    
    if (imgAvatar.name == undefined || imgAvatar.name == '' || imgAvatar.name == null) {
      item.customerAvatar = '';
    } else {
      item.customerAvatar = 'images/avatar/' + imgAvatar.name;
    }
    await itemsModel.create(item, (err, data) => {
      // res.json(item);  
      res.redirect('/customer');
    });
  } else {
    let imgAvatar = {
      name: ''
    };
    if (req.files) {
      imgAvatar = req.files.customerAvatar;
      await imgAvatar.mv(path.resolve('public/images/avatar', imgAvatar.name));
      imgAvatar.name = 'images/avatar/' + imgAvatar.name;
    }
    await itemsModel.findByIdAndUpdate({ _id: id }, {
      customerName: item.customerName,
      customerAvatar: imgAvatar.name,
      customerEmail: item.customerEmail,
      customerGender: item.customerGender,
      customerDate: item.customerDate,
      customerTelephone: item.customerTelephone,
      customerJob: item.customerJob,
      customerAddress: item.customerAddress,
      customerGroupId: item.customerGroupId,
      modified: {
        nameUpdateAt: userObj.name,
        time: Date.now()
      }
    }, (err, data) => {
      res.redirect('/customer');
      // res.json(data)
    });
  }

})

/* GET details an record. */
router.get('(/trash)?/details/:id', checkAuthentication, async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel
    .findById({ _id: _id })
    .then(data => {
      res.render('./pages/customers/detailCustomer', {
        items: data,
      })
      // res.json(data)
    })
});

/* DELETE delete to trash restore an customer. */
router.get('/delete/:id', checkAuthentication, async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel.updateOne({ _id: _id }, {
    softErase: {
      nameSoftEraseAt: userObj.name,
      time: Date.now()
    },
    softDelete: "1",
  }, (err, data) => {
    res.redirect('back');
    // res.json(data)
  });
});


/* view record to trash restore an customer. */
router.get('/trash/viewRestore', checkAuthentication, async function (req, res, next) {

  const taskOne = await itemsModel
    .find({ softDelete: '1' })
    .sort({ customerName: 1 })

  const taskTwo = await itemsModel // !count record if softDelete: '1'
    .countDocuments({ softDelete: '1' })

  Promise.all([taskOne, taskTwo]).then(([dataOne, dataTwo]) => {
    res.render('./pages/customers/restoreCustomer', {
      items: dataOne,
      countRestore: dataTwo,
    })
  })
});

/* RESTORE record to table an customer. */
router.get('/trash/restore/:id', checkAuthentication, async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel.updateOne({ _id: _id }, {
    softDelete: "0",
  }, (err, data) => {
    res.redirect('back');
    // res.json(data)
  });
});

/* Delete from Trash Restore */
router.get('/trash/delete/:id', checkAuthentication, async function (req, res, next) {
  const _id = req.params.id;
  await itemsModel
    .deleteOne({ _id: _id })
    .then(data => {
      res.status(201).redirect('back');
      // res.json(data)
    })
});

router.get('/sort/:sort_field/:sort_type', function (req, res, next) {
  req.session.sort_field = req.params.sort_field;
  req.session.sort_type = req.params.sort_type;
  res.redirect('back');
});
module.exports = router;
