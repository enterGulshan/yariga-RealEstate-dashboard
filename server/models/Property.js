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
    required: true,
    default: function() {
      // Generate a property image based on type
      const propertyTypes = {
        'Apartment': 'apartment',
        'House': 'modern-house',
        'Villa': 'luxury-villa',
        'Hotel': 'luxury-hotel',
        'Commercial': 'office-building'
      };
      const keyword = propertyTypes[this.type] || 'modern-house';
      return `https://source.unsplash.com/800x600/?${keyword}`;
    }
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
