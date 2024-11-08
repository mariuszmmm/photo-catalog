const mongoose = require('../config/mongooseConfig');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  header: { type: String, required: true },
  content: { type: String },
  image: { type: String },
  url: { type: String },
  downloadUrl: { type: String },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;