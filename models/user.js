const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: [true, "Email must be unique"] },
  password: { type: String, required: true, minlength: [3, 'Password should have atleast 3 characters'] },
  mobile: {type: Number, required: true }, 
  gender: {type: String, required: true },
  type: {type: String, required: true }, 
  address: { type: String, required: true }, 
  city: {type: String, required: true }, 
  state: {type: String, required: true },  
  Url: {type: String, required: true },  
  datetime: { type: String, required: true},
  resetToken: {type: String},
  expireToken : { type: Date}},
  {timestamps:true}
  );

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
