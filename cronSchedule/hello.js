
const itemsModel = require('./../model/schemasCustom')
const mongoose = require('mongoose');
const moment = require('moment');


const hello =() => {

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    console.log(currentDay,currentMonth)
    // // !setup connect to MongoDB
    // await mongoose.connect(`mongodb+srv://admin:admin@cluster0.ilkgc.mongodb.net/crm_demo?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
    // mongoose.connection;

    // itemsModel.aggregate([
    //     {
    //         $project: {
    //             customerName: 1,
    //             date: { $dayOfMonth: '$customerDate' },
    //             month: { $month: '$customerDate' },
    //         }
    //     },
    //     { $match: { date: currentDay , month: currentMonth } }
    // ]).then(data => {
    //     (data == null ) ?  console.log('noData') :  console.log(data)
    // })

    console.log('ahihihi')


}

hello();

