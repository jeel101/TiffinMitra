const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String], // array of ingredient names
    default: []
  },
  diet: {
    type: String, // e.g., "Vegetarian", "Vegan", "Non-Vegetarian"
    default: ""
  },
  cook_time: {
    type: Number, // in minutes
    default: 0
  },
  flavor_profile: {
    type: String, // e.g., "Spicy", "Sweet", "Savory"
    default: ""
  },
  course: {
    type: String, // e.g., "Main", "Appetizer", "Dessert"
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  region: {
    type: String,
    default: ""
  },
  festival: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'providers'
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  enteredQuantity: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('foods', foodSchema);
