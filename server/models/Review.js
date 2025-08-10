const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerAvatar: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    required: true
  },
  timePosted: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    enum: ['EXCELLENT', 'GREAT', 'BEST SERVICE', 'BAD SERVICE', 'UNEXPECTED']
  }],
  status: {
    type: String,
    enum: ['All Reviews', 'Published', 'Deleted'],
    default: 'Published'
  },
  actions: {
    reject: { type: Boolean, default: false },
    approve: { type: Boolean, default: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
