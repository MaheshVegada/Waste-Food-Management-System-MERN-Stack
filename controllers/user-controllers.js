const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const HttpError = require('../models/http-error');
const User = require('../models/user');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key: process.env.Mail_API
  }
}))

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { fullname, email, password,  mobile, gender, type, address, city, state, Url} = req.body;
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
          + (currentdate.getMonth()+1)  + "/" 
          + currentdate.getFullYear() + " @ "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword; 
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    fullname,
    email,
    password: hashedPassword,
    mobile,
    gender,
    type,
    address,
    city,
    state,
    Url,
    datetime
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  transporter.sendMail({
    to : createdUser.email,
    from: "we-dont-waste-food@king.buzz",
    subject:"Registration Successful",
    html:"<h1>welcome to we don't waste food</h1>"
  })
  res.status(201)
    .json({ userId: createdUser.id, 
            email: createdUser.email,
            mobile: createdUser.mobile,
            gender: createdUser.gender, 
            type: createdUser.type, 
            address: createdUser.address, 
            city: createdUser.city,
            state: createdUser.state,
            Url: createdUser.Url,
            datetime: datetime,
            token: token 
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

const resetPassword = (req,res,next) => {
  crypto.randomBytes(32,(err,buffer) => {
    if(err) {
        const error = new HttpError(
          'token creation failed.',
          500
          );
          return next(error);
    }
    const token1 = buffer.toString("hex");
    try {
      User.findOne({email: req.body.email})
      .then(user  => {
        if(!user) {
          const error = new HttpError(
            'no user found.',
            422
          );
          return next(error);
        }
        user.resetToken = token1
        user.expireToken = Date.now() + 3600 * 1000
        try {
            user.save().then((result) => {
            transporter.sendMail({
              to:user.email,
              from:"we-dont-waste-food@king.buzz",
              subject:"Password Reset",
              html: `
              <p>You requested for password reset</p>
              <h4>Click in this <a href="https://we-dont-waste-food.herokuapp.com/reset-password/${token1}">link</a> to reset password</h4>
              `
            })
            res.json({message:"check your email"})
          })
        } catch (err) {
          const error = new HttpError(
            'Signing up failed, please try again later.',
            500
          );
          return next(error);
        }
        
      })
    }catch(err){};
  }) 
};

const newPassword = (req,res,next) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    User.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
          const error = new HttpError(
            'Email Id is not registered.',
            422
          );
          return next(error);
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
          user.password = hashedpassword
          user.resetToken = undefined
          user.expireToken = undefined
          user.save().then((saveduser)=>{
            res.json({message:"Password Updateded successfully"})
          })
        })
    }).catch(err=>{
    })
};

const viewProfile = async (req, res, next) => {
  let users;
  try {
    users = await User.findOne({_id:req.userData.userId});
  } catch (err) {
    const error = new HttpError(
      'Fetching User failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({  
            name: users.fullname,  
            email: users.email,
            mobile: users.mobile,
            gender: users.gender, 
            type: users.type, 
            address: users.address, 
            city: users.city,
            state: users.state,
            Url: users.Url 
  });
};

const editProfile = async (req, res, next) => {
  let users;
  const { fullname, email, mobile, gender, type, address, city, state, Url} = req.body;
  try {
      users = await User.findOne({_id: req.userData.userId});
      users.fullname = fullname,  
      users.email = email,
      users.mobile = mobile,
      users.gender = gender,
      users.type = type,
      users.address = address,
      users.city = city,
      users.state = state,
      users.Url = Url
      users.save().then((saveduser)=>{
      })

  } catch (err) {
    const error = new HttpError(
      'Edit User Profile failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({  
            fullname: users.fullname,  
            email: users.email,
            mobile: users.mobile,
            gender: users.gender, 
            type: users.type, 
            address: users.address, 
            city: users.city,
            state: users.state,
            Url: users.Url 
  });
};

exports.signup = signup;
exports.login = login;
exports.resetPassword = resetPassword;
exports.newPassword = newPassword;
exports.viewProfile = viewProfile;
exports.editProfile = editProfile;
