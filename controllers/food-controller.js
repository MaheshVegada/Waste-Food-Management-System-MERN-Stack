const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const HttpError = require('../models/http-error');
const Food = require('../models/food');
const Receive = require('../models/receive');
const User = require('../models/user');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: process.env.Mail_API
  }
}))

const addfood = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { funcname, name, mobile, description, quantity, quality, foodtype, cookedtime, expirytime, address, city, state, lat, lng, Url } = req.body;

  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear() + " @ "  
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();

  let recId = false;
  let status = true;
  let received = false;
  const addedFood = new Food({
        userId:req.userData.userId,
        recId,
        funcname, 
        name, 
        mobile, 
        description, 
        quantity, 
        quality, 
        foodtype, 
        cookedtime, 
        expirytime, 
        status,
        received,
        address, 
        city, 
        state,
        lat,
        lng,
        Url,
        datetime
  });
  try {
    await addedFood.save();
  } catch (err) {
    const error = new HttpError(
      'Adding Food failed, please try again later.',
      500
    );
    return next(error);
  }
  res
    .status(201)
    .json({ foodId: addedFood.id, 
            userId: addedFood.userId,
            funcname: addedFood.funcname,
            name: addedFood.name,
            mobile: addedFood.mobile,
            description: addedFood.description,
            quantity: addedFood.quantity,
            quality: addedFood.quality,
            foodtype: addedFood.foodtype,
            cookedtime: addedFood.cookedtime,
            expirytime: addedFood.expirytime,
            address: addedFood.address,
            status: status,
            received: received,
            city: addedFood.city,
            state: addedFood.state,
            lat: addedFood.lat,
            lng: addedFood.lng,
            Url: addedFood.Url,
            datetime: datetime
    });
};

const getFood = async (req, res, next) => {
  let foods;
  try {
    var currentDate = new Date(); 
    foods = await Food.find({status:'true',received:'false', expirytime:{$gt:currentDate}}, '-datetime');
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ foods: foods.map(food => food.toObject({getters: true })) });
};

const viewfood = async (req, res, next) => {
  let food;
  try {
    food = await Food.findOne({_id:req.body.foodId}, '-datetime');
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
      500
    );
    return next(error);
  }
  let coor = { "lat":food.lat, "lng":food.lng};
  res.json({foodId: food.id, 
            userId: food.userId,
            funcname: food.funcname,
            name: food.name,
            mobile: food.mobile,
            description: food.description,
            quantity: food.quantity,
            quality: food.quality,
            foodtype: food.foodtype,
            cookedtime: food.cookedtime,
            expirytime: food.expirytime,
            address: food.address,
            status: food.status,
            received: food.received,
            city: food.city,
            state: food.state,
            coor: coor,
            Url: food.Url
     });
};

const deletefood = async (req, res, next) => {
  try {
    let food = await Food.deleteOne({_id: req.body.foodId});
    res.send(food);
  } catch (err) {
    const error = new HttpError(
      'Deleting food failed, please try again later.',
      500
    );
    return next(error);
  }
};

const acceptfood = async (req, res, next) => {
  let food,donator,receiver;
  const { donId, foodId, name, email, mobile, address, exptime } = req.body;
  try {
    food = await Food.findOne({_id:foodId});
    donator = await User.findOne({_id:donId});
    receiver = await User.findOne({_id:req.userData.userId});
    food.status = false;
    food.recId = req.userData.userId;
    const receive = new Receive({
      donId, 
      foodId, 
      recId:req.userData.userId, 
      name, 
      email, 
      mobile, 
      address, 
      exptime
    });
    try {
      await receive.save();
      await food.save();
      transporter.sendMail({
        to : donator.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`${receiver.fullname} has Requested for ${food.name}`,
        html:`<div><h1>${receiver.fullname} has Requested for ${food.name}</h1>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              <p>Pickup time: ${receive.exptime} </p>              
              </div>`                   
      })
      transporter.sendMail({
        to : receiver.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`You have successfully requested ${food.name} from ${donator.fullname}`,
        html:`<div><h1>You have successfully requested ${food.name} from ${donator.fullname}</h1>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              <p>Pickup time: ${receive.exptime} </p> 
              </div>`                   
      })
    } catch (err) {
      const error = new HttpError(
        'receive 1failed, please try again later.',
        500
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'receive 2failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
      donId: donId,
      foodId: foodId, 
      recId: req.userData.userId,
      name: name,
      email: email,
      mobile: mobile,
      address: address,
      exptime: exptime
     });
};

const viewdonatedfood = async (req, res, next) => {
  let foods;
  try {
    foods = await Food.find({userId: req.userData.userId});
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
       500
    );
    return next(error);
  }
  res.json({ foods: foods.map(food => food.toObject({getters: true })) });
};

const viewreceivedfood = async (req, res, next) => {
  let foods;
  try {
    foods = await Food.find({recId: req.userData.userId});
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
       500
    );
    return next(error);
  }
  res.json({ foods: foods.map(food => food.toObject({getters: true })) });
};

const openviewdonatefood = async (req, res, next) => {
  let food,donator,receiver,recdetail;
  try {
    food = await Food.findOne({_id: req.body.foodId});
    donator = await User.findOne({_id: req.userData.userId});
    try {
      receiver = await User.findOne({_id: food.recId});
      recdetail = await Receive.findOne({foodId: req.body.foodId});
    } catch (err) {
      receiver = false;
      recdetail = false;
    }
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
       500
    );
    return next(error);
  }
  let details = { "food":food, "donator":donator, "receiver":receiver, "recdetail":recdetail };
  res.send(details);
};

const openviewreceivedfood = async (req, res, next) => {
  let food,receiver,donator,recdetail;
  try {
    food = await Food.findOne({_id: req.body.foodId});
    receiver = await User.findOne({_id: req.userData.userId});
    donator = await User.findOne({_id: food.userId});
    recdetail = await Receive.findOne({foodId: req.body.foodId});
  } catch (err) {
    const error = new HttpError(
      'Fetching food failed, please try again later.',
       500
    );
    return next(error);
  }
  let details = { "food":food, "donator":donator, "receiver":receiver ,"recdetail":recdetail};
  res.send(details);
};

const receivedfood = async (req, res, next) => {
  try {
    let food = await Food.findOne({_id: req.body.foodId});
    let receiver = await User.findOne({_id: food.recId});
    let donator = await User.findOne({_id: food.userId});
    food.received = true;
    try {
      await food.save();
      transporter.sendMail({
        to : donator.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`Congratulations, ${donator.fullname}`,
        html:`<div><h1>We got your confirmation that ${receiver.fullname} has collected ${food.name} succesfully.</h1>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              </div>`                   
      })
      transporter.sendMail({
        to : receiver.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`Congratulation ${receiver.fullname}`,
        html:`<div><h1>${donator.fullname} has confirmed the pickup of ${food.name} succesfully.</h1>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              </div>`      
      })
    } catch (err) {
      const error = new HttpError(
        'received 1failed, please try again later.',
        500
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'received 2failed, please try again later.',
      500
    );
    return next(error);
  }
};

const cancelledfood = async (req, res, next) => {
  try {
    let food = await Food.findOne({_id: req.body.foodId});
    let receiver = await User.findOne({_id: food.recId});
    let donator = await User.findOne({_id: food.userId});
    let data = await Receive.deleteOne({foodId: req.body.foodId});

    try {
      transporter.sendMail({
        to : donator.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`You have rejected the request of ${food.name} by ${receiver.fullname}`,
        html:`<div><h1>You have rejected the request of ${food.name} by ${receiver.fullname}</h1>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              </div>`       
      })
      transporter.sendMail({
        to : receiver.email,
        from: "we-dont-waste-food@king.buzz",
        subject:`${donator.fullname} had rejected your request of ${food.name}`,
        html:`<div><h1>${donator.fullname} had rejeted your request of ${food.name}</h1>
              <p>Reason of Rejection: ${req.body.rejmessage}</p>
              <img src = ${food.Url} width = "200" height = "200" ><br><br>
              <p>Donator: ${donator.fullname} </p>
              <p>Receiver: ${receiver.fullname} </p>
              <p>Food: ${food.name} </p>
              </div>`
      })
      food.recId = false;
      food.status = true;
      await food.save();
      await data.save();

    } catch (err) {
      const error = new HttpError(
        'received 1failed, please try again later.',
        500
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      'received 2failed, please try again later.',
      500
    );
    return next(error);
  }
};

const contributors = async (req,res,next) => {
  var Don = [];
  var Rec = [];
  try{

    let donator = await Receive.aggregate([
      {$group: {_id: "$donId", count: {$sum:1}}},
      {$sort: {count: -1}} 
    ])
    for(var i = 0; i < donator.length, i<3; i++) {
          let don = await User.findById(donator[i]._id);
          let count = donator[i].count;
          Don[i] = {"don":don, "count":count}
    }

    let receiver = await Receive.aggregate([
      {$group: {_id: "$recId", count: {$sum:1}}},
      {$sort: {'count': -1}} 
    ])
    for(var i = 0; i < receiver.length,i<3; i++) {
        let rec = await User.findById(receiver[i]._id);
        let count = receiver[i].count;
        Rec[i] = {"rec":rec, "count":count}
    }
  }catch(err){
    const error = new HttpError(
      'failed, please try again later.',
      500
    );
  }
  let contributors = {"Don":Don, "Rec":Rec}
  res.send(contributors);
};

exports.viewfood = viewfood;
exports.addfood = addfood;
exports.getFood = getFood;
exports.deletefood = deletefood;
exports.acceptfood = acceptfood;
exports.viewdonatedfood = viewdonatedfood;
exports.viewreceivedfood = viewreceivedfood;
exports.receivedfood = receivedfood;
exports.cancelledfood = cancelledfood;
exports.openviewdonatefood = openviewdonatefood;
exports.openviewreceivedfood = openviewreceivedfood;
exports.contributors = contributors;