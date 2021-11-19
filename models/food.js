const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'User' },
  recId: {type: String, required: true},
  funcname: { type: String, required: true },
  name: { type: String, required: true },
  mobile: {type: Number, required: true }, 
  description: { type: String, required: true },
  quantity: { type: String, required: true },
  quality: {type: Number, required: true }, 
  foodtype: {type: String, required: true }, 
  cookedtime: { type: String, required: true},
  expirytime: { type: Date, required: true},
  status: {type: Boolean, required: true },
  received: {type: Boolean, required: true},
  address: { type: String, required: true }, 
  city: {type: String, required: true }, 
  state: {type: String, required: true }, 
  lat: {type: Number, rewuired: true},
  lng: {type: Number, rewuired: true},
  Url: {type: String, required: true }, 
  datetime: { type: String, required: true},
  resetToken: {type: String},
  expireToken : { type: Date}
});

module.exports = mongoose.model('Food', foodSchema);