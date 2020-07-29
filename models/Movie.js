const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: { type: String, required: true },
  image: { type: String, required: true }, // Takes in relative path for image url
  price: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', MovieSchema);
