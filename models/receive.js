const mongoose = require('mongoose');
const User = require('./user');
const Food = require('./food');
const Schema = mongoose.Schema;

const receiveSchema = new Schema({
  donId: {type: mongoose.Types.ObjectId, ref: 'User' },
  foodId: {type: mongoose.Types.ObjectId, ref: 'Food' },
  recId: {type: mongoose.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: {type: Number, required: true },
  address: { type: String, required: true },
  exptime: { type: Date, required: true}
});

module.exports = mongoose.model('Receive', receiveSchema);