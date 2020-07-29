const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheaterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('theater', TheaterSchema);
