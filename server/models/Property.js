const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['For Sale', 'For Rent', 'Sold'],
    default: 'For Sale'
  },
  type: {
    type: String,
    enum: ['Apartment', 'House', 'Villa', 'Hotel', 'Commercial'],
    required: true
  },
  description: {
    type: String
  },
  features: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
