const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  resellingPrice: { type: Number, required: true },
  category: { type: String, required: true },
  file: { type: String, required: true }, 
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  buyer : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
  status : { type: String, enum: ['available', 'sold'], default: 'available'}
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
