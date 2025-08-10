const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  agency: {
    type: String,
    required: true
  },
  agentLicense: {
    type: String,
    required: true
  },
  taxNumber: {
    type: String,
    required: true
  },
  serviceArea: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: function() {
      return `https://ui-avatars.com/api/?name=${this.firstName}+${this.lastName}&background=random&color=fff&size=400`;
    }
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  totalListings: {
    type: Number,
    default: 0
  },
  propertiesSold: {
    type: Number,
    default: 0
  },
  propertiesRent: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for full name
agentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to update the updatedAt field
agentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
